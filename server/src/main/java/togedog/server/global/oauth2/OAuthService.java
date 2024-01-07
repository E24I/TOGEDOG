package togedog.server.global.oauth2;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService {

    private final GoogleOAuth googleOAuth;

    public String oAuthLogin(LoginType loginType, String oAuthToken) {

        String TOKEN = null;

        switch (loginType){
            case GOOGLE: {
                ResponseEntity<String> responseGoogleToken = googleOAuth.requestMemberInfo(oAuthToken);

                try {
                    TOKEN = googleOAuth.oAuthTokenToServerToken(responseGoogleToken);
                }catch (JsonProcessingException e){
                    throw new RuntimeException("문제가 발생하였습니다.");
                }
                break;
            }

            case KAKAO: {
                break;
            }

            default: throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
        }

        return TOKEN;
    }


//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//
//        OAuth2UserService delegate = new DefaultOAuth2UserService();
//        OAuth2User oAuth2User = delegate.loadUser(userRequest);
//
//
//        String registrationId = userRequest.getClientRegistration().getRegistrationId();
//
//        String userNameAttributeName = userRequest.getClientRegistration()
//                .getProviderDetails()
//                .getUserInfoEndpoint()
//                .getUserNameAttributeName();
//
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//
//        for(String key : attributes.keySet()){
//            System.out.println(key + " : " + attributes.get(key));
//        }
//
//        Member member = save(attributes);
//
//        return new DefaultOAuth2User(
//                Collections.emptyList(),
//                attributes,
//                userNameAttributeName
//        );
//
//    }


}
