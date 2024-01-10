package togedog.server.global.oauth2;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.jwt.JWTokenizer;
import togedog.server.global.auth.utils.CustomAuthorityUtils;

import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoogleOAuth {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final JWTokenizer jwTokenizer;

    public Optional<Member> verifyMember(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember;
    }

    public ResponseEntity<String> requestMemberInfo(String token){

        String GOOGLE_USER_REQUEST_URL = "https://www.googleapis.com/oauth2/v1/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer" + token);
        log.info("Authorization : Bearer" + token);

        HttpEntity request = new HttpEntity(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    GOOGLE_USER_REQUEST_URL,
                    HttpMethod.GET,
                    request,
                    String.class
            );
            return response;

        }catch (Exception e){
            throw new RuntimeException("요청이 문제가 있어요");
        }
    }

    public String oAuthTokenToServerToken(ResponseEntity<String> memberResponse) throws JsonProcessingException {
        OAuthDto.GoogleDto googleDto = objectMapper.readValue(memberResponse.getBody(), OAuthDto.GoogleDto.class);

        Optional<Member> existMember = verifyMember(googleDto.getEmail());

        if(existMember.isEmpty()){
            Member member = new Member(googleDto.getEmail(), googleDto.getId(), googleDto.getPicture());
            List<String> roles = customAuthorityUtils.createRoles(member.getEmail());
            member.setRoles(roles);

            Authentication authentication = new UsernamePasswordAuthenticationToken(member.getEmail(), null, customAuthorityUtils.createAuthorities(roles));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            Member newMember = memberRepository.save(member);

            String accessToken = "Bearer" + delegateAccessToken(newMember);
            return accessToken;
        }else {
            Member member = existMember.orElseThrow();
            Authentication authentication = new UsernamePasswordAuthenticationToken(member.getEmail(), null, customAuthorityUtils.createAuthorities(member.getRoles()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return "Bearer" + delegateAccessToken(existMember.orElseThrow());
        }

    }

    private String delegateAccessToken(Member member){

        Map<String, Object> claims = new HashMap<>();

        claims.put("id", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("nickname", member.getNickname());
        claims.put("roles", member.getRoles());
        claims.put("image", member.getImage());

        String subject = member.getEmail();
        Date expiration = jwTokenizer.getTokenExpiration(jwTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwTokenizer.encodeBase64SecretKey(jwTokenizer.getSecretKey());

        String accessToken = jwTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        return accessToken;
    }

}
