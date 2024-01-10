//package togedog.server.global.oauth2;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.util.UriComponentsBuilder;
//import togedog.server.domain.member.entity.Member;
//import togedog.server.domain.member.repository.MemberRepository;
//import togedog.server.global.auth.jwt.JWTokenizer;
//import togedog.server.global.auth.utils.CustomAuthorityUtils;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URI;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    private final JWTokenizer jwTokenizer;
//    private final CustomAuthorityUtils authorityUtils;
//    private final MemberRepository memberRepository;
//
//    public OAuth2MemberSuccessHandler(JWTokenizer jwTokenizer,
//                                      CustomAuthorityUtils authorityUtils,
//                                      MemberRepository memberRepository) {
//        this.jwTokenizer = jwTokenizer;
//        this.authorityUtils = authorityUtils;
//        this.memberRepository = memberRepository;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
//        var oAuth2User = (OAuth2User) authentication.getPrincipal();
//        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
//        String nickname = String.valueOf(oAuth2User.getAttributes().get("profile"));
//        List<String> authorities = authorityUtils.createRoles(email);
//
//        saveMember(email, nickname);
//        redirect(request, response, email, authorities);
//    }
//
//    private void saveMember(String email, String nickname){
//        log.info("savemember 시작");
//        Member member = new Member(email, nickname, null); //이메일을 가져와서 대입, 이름도 추가되야한다.
//        memberRepository.save(member);
//    }
//
//
//
//    private void redirect(HttpServletRequest request, HttpServletResponse response, String email, List<String> authorities) throws IOException {
//        String accessToken = delegateAccessToken(email, authorities);
//        String refreshToken = delegateRefreshToken(email);     // (6-2)
//
//        String uri = createURI(accessToken, refreshToken).toString();
//        getRedirectStrategy().sendRedirect(request,response,uri);
//    }
//
//    private String delegateAccessToken(String email, List<String> authorities){
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", email);
//        claims.put("roles", authorities);
//
//        String subject = email;
//        Date expiration = jwTokenizer.getTokenExpiration(jwTokenizer.getAccessTokenExpirationMinutes());
//        String base64EncodedSecretKey  = jwTokenizer.encodeBase64SecretKey(jwTokenizer.getSecretKey());
//        String accessToken = jwTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//        return accessToken;
//    }
//
//    private String delegateRefreshToken(String username) {
//        String subject = username;
//        Date expiration = jwTokenizer.getTokenExpiration(jwTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwTokenizer.encodeBase64SecretKey(jwTokenizer.getSecretKey());
//
//        String refreshToken = jwTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//
//        return refreshToken;
//    }
//
//    private URI createURI(String accessToken, String refreshToken) {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host("localhost")
//                .port(80)
//                .path("/receive-token.html")
//                .queryParams(queryParams)
//                .build()
//                .toUri();
//    }
//
//}
