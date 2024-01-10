package togedog.server.global.oauth2;

import lombok.Getter;
import lombok.Setter;

public class OAuthDto {

    @Getter
    @Setter
    static class TokenDto{
        private String token;
    }


    @Getter
    @Setter
    static class GoogleDto {
        private String email;
        private String picture;
        private String id;
    }

}

