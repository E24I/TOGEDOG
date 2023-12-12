package togedog.server.domain.mapcontent.service;

import lombok.RequiredArgsConstructor;
import org.locationtech.proj4j.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.mapcontent.dto.MapContentRequest;
import togedog.server.domain.mapcontent.dto.MapContentResponse;
import togedog.server.domain.mapcontent.entity.MapContent;
import togedog.server.domain.mapcontent.repository.MapContentRepository;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MapContentService {

    private final MapContentRepository mapContentRepository;

    private final FeedRepository feedRepository;

    @Transactional
    public Long createMapContent(MapContentRequest mapContentRequest) {

        double utm_x = Double.parseDouble(mapContentRequest.getUtm_k_x());
        double utm_y = Double.parseDouble(mapContentRequest.getUtm_k_y());

        CRSFactory crsFactory = new CRSFactory();
        //EPSG(WGS84):4166, 4326
        String wgs84Proj = "+proj=longlat +datum=WGS84 +no_defs";
        //EPSG(UTM-K):5178
        String utmkProj = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";

//        CoordinateReferenceSystem WGS84 = crsFactory.createFromName("epsg:4326");
//        CoordinateReferenceSystem UTM_K = crsFactory.createFromName("epsg:5178");

        CoordinateReferenceSystem WGS84 = crsFactory.createFromParameters("WGS84", wgs84Proj);
        CoordinateReferenceSystem UTM_K = crsFactory.createFromParameters("UTMK", utmkProj);

        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        CoordinateTransform utm_kToWgs = ctFactory.createTransform(UTM_K, WGS84);
        ProjCoordinate result = new ProjCoordinate();
        utm_kToWgs.transform(new ProjCoordinate(utm_x, utm_y), result);

        MapContent mapContent = MapContent.builder()
                .wsg84_x(Double.toString(result.x))
                .wsg84_y(Double.toString(result.y))
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
                .wgs84_x(mapContent.getWsg84_x())
                .wgs84_y(mapContent.getWsg84_y())
                .build();
    }
}
