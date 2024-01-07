//package togedog.server.global.oauth2;
//
//import lombok.Builder;
//import lombok.Getter;
//import lombok.ToString;
//
//import java.util.Map;
//
//@Getter
//@ToString
//public class OAuthAttributes {
//
//    private Map<String, Object> attributes;
//    private String nickname;
//    private String email;
//    private String profileImageUrl;
//
//    @Builder
//    public OAuthAttributes(Map<String, Object> attributes, String nickname, String email, String profileImageUrl) {
//        this.attributes = attributes;
//        this.nickname = nickname;
//        this.email = email;
//        this.profileImageUrl = profileImageUrl;
//    }
//
//    public OAuthAttributes of(String provider, Map<String, Object> attributes){
//        if("google".equals(provider)){
//            return ofGoogle("sub", attributes);
//        } else if ("kakao".equals(provider)){
//            return ofKakao("id", attributes);
//        }else if ("naver".equals(provider)){
//            return ofNaver("id", attributes);
//        }
//
//        return null;
//    }
//
//    private OAuthAttributes ofGoogle(String userNameAttributesName, Map<String, Object> attributes){
//        return OAuthAttributes.builder()
//                .nickname(String.valueOf(attributes.get("name")))
//                .email(String.valueOf(attributes.get("email")))
//                .profileImageUrl(String.valueOf(attributes.get("picture")))
//                .attributes(attributes)
//                .build();
//    }
//}
