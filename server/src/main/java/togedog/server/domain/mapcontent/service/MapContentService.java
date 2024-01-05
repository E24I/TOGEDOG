package togedog.server.domain.mapcontent.service;

import lombok.RequiredArgsConstructor;
import org.locationtech.proj4j.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feed.service.dto.response.FeedResponse;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.feedbookmark.repository.FeedBookmarkRepository;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.repository.FeedLikeRepository;
import togedog.server.domain.mapcontent.dto.MapContentFeedResponse;
import togedog.server.domain.mapcontent.dto.MapContentGetRequest;
import togedog.server.domain.mapcontent.dto.MapContentRequest;
import togedog.server.domain.mapcontent.dto.MapContentResponse;
import togedog.server.domain.mapcontent.entity.MapContent;
import togedog.server.domain.mapcontent.repository.MapContentRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.service.MemberService;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.mapcontentexception.MapContentNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MapContentService {

    private static final Double X_COORDINATE_VALUE_PER_100_METERS = 0.0012;

    private static final Double Y_COORDINATE_VALUE_PER_100_METERS = 0.0009;

    private final MapContentRepository mapContentRepository;

    private final FeedRepository feedRepository;

    private final MemberService memberService;

    private final FeedService feedService;

    private final FeedBookmarkRepository feedBookmarkRepository;

    private final FeedLikeRepository feedLikeRepository;

    @Transactional
    public Long createMapContent(MapContentRequest mapContentRequest) {

        double utm_x = Double.parseDouble(mapContentRequest.getUtm_k_x());
        double utm_y = Double.parseDouble(mapContentRequest.getUtm_k_y());

        CRSFactory crsFactory = new CRSFactory();
        String wgs84Proj = "+proj=longlat +datum=WGS84 +no_defs";
        String utmkProj = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";

        CoordinateReferenceSystem WGS84 = crsFactory.createFromParameters("WGS84", wgs84Proj);
        CoordinateReferenceSystem UTM_K = crsFactory.createFromParameters("UTMK", utmkProj);

        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        CoordinateTransform utm_kToWgs = ctFactory.createTransform(UTM_K, WGS84);
        ProjCoordinate result = new ProjCoordinate();
        utm_kToWgs.transform(new ProjCoordinate(utm_x, utm_y), result);

        MapContent mapContent = MapContent.builder()
                .wgs84x(result.x)
                .wgs84y(result.y)
                .feeds(new ArrayList<>())
                .build();

        Feed feed = feedRepository.findById(mapContentRequest.getFeedId()).orElseThrow(FeedNotFoundException::new);

        mapContent.getFeeds().add(feed);

        mapContent = mapContentRepository.save(mapContent);

        feed.setMapContent(mapContent);

        return mapContent.getMapContentId();
    }

    public MapContentResponse findMapContent(Long feedId) {

        Feed feed = feedRepository.findById(feedId).orElseThrow(FeedNotFoundException::new);

        MapContent mapContent = mapContentRepository.findById(feed.getMapContent().getMapContentId()).orElseThrow();

        return MapContentResponse.builder()
                .wgs84_x(Double.toString(mapContent.getWgs84x()))
                .wgs84_y(Double.toString(mapContent.getWgs84y()))
                .build();
    }

    public MapContentFeedResponse findFeedFromWsg84(MapContentGetRequest request) {

        double thresholdX = Double.parseDouble(request.getWgs84_x());
        double thresholdY = Double.parseDouble(request.getWgs84_y());

        double thresholdXMin = thresholdX - ( X_COORDINATE_VALUE_PER_100_METERS * request.getRange() );
        double thresholdXMax = thresholdX + ( X_COORDINATE_VALUE_PER_100_METERS * request.getRange() );

        double thresholdYMin = thresholdY - ( Y_COORDINATE_VALUE_PER_100_METERS * request.getRange() );
        double thresholdYMax = thresholdY + ( Y_COORDINATE_VALUE_PER_100_METERS * request.getRange() );

        List<MapContent> findMapContent = mapContentRepository.findMapContentByThreshold(thresholdXMin, thresholdXMax, thresholdYMin, thresholdYMax);

        if(findMapContent.isEmpty()) {
            throw new MapContentNotFoundException();
        }

        Member member = memberService.findMember(request.getMemberId());

        MapContentFeedResponse response = new MapContentFeedResponse();

        List<Feed> findFeeds = new ArrayList<>();

        for(MapContent mapContent : findMapContent) {
            for(Feed feed : mapContent.getFeeds()) {
                findFeeds.add(feedRepository.findByFeedIdAndDeleteYnIsFalse(feed.getFeedId()).orElseThrow(FeedNotFoundException::new));
            }
        }

        if(!findFeeds.isEmpty()) {
            for(Feed feed : findFeeds) {
                response.getFeedResponses().add(FeedResponse.singleFeedResponse(feed, isFeedBookmarkedByMember(member, feed), isFeedLikedByMember(member, feed)));
            }
        }

        return response;
    }

    private boolean isFeedBookmarkedByMember(Member member, Feed feed) {
        Optional<FeedBookmark> optionalFeedBookmark = feedBookmarkRepository.findByMemberAndFeed(member, feed);
        return optionalFeedBookmark.isPresent();
    }

    private boolean isFeedLikedByMember(Member member, Feed feed) {
        Optional<FeedLike> optionalFeedLike = feedLikeRepository.findByMemberAndFeed(member, feed);
        return optionalFeedLike.isPresent();
    }
}
