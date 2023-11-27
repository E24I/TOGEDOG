package togedog.server.domain.reply.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.domain.reply.service.dto.request.ReplyServiceCreateApiRequest;
import togedog.server.domain.reply.service.dto.request.ReplyServiceUpdateApiRequest;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;
    private final FeedRepository feedRepository;


    public Long createReply(ReplyServiceCreateApiRequest request, Long feedId) {

        Long loginMemberId = 12313L; // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogined(loginMemberId);


        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Optional<Feed> feedOptional = feedRepository.findById(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        Reply reply = postReply(request, member, feed);
        replyRepository.save(reply);

        return reply.getReplyId();

    }

    public void UpdateReply(ReplyServiceUpdateApiRequest request, Long replyId) {

        Long loginMemberId = 12313L; // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogined(loginMemberId);

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        findByLoginId(loginMemberId);

        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply reply = optionalReply.orElseThrow(ReplyNotFoundException::new);

        checkAccessAuthority(reply.getMember().getMemberId(), loginMemberId);

        updateReply(request, reply);

    }

    public void deleteReply(Long replyId) {

        Long loginMemberId = 12313L; // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogined(loginMemberId);

//        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
//        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        findByLoginId(loginMemberId);

        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply reply = optionalReply.orElseThrow(ReplyNotFoundException::new);

        checkAccessAuthority(reply.getMember().getMemberId(), loginMemberId);

        reply.deleteMyReply();


    }

    private Long isLogined(Long loginMemberId) {
        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        return loginMemberId;
    }

    private Member findByLoginId(Long loginMemberId) {
        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        return member;

    }
    private void checkAccessAuthority(Long AuthorId, Long loginMemberId) {
        if (!AuthorId.equals(loginMemberId)) {
            throw new MemberAccessDeniedException();
        }
    }

    private Reply postReply(ReplyServiceCreateApiRequest request, Member member, Feed feed) {

        return Reply.crateReply(
                request.getContent(),
                request.getFix(),
                member,
                feed
        );
    }

    private void updateReply(ReplyServiceUpdateApiRequest request, Reply reply) {

        reply.updateMyReply(
                 request.getContent()
         );
    }
}
