package togedog.server.domain.member.dto;

import lombok.Getter;

public class MemberDto {

    @Getter
    public static class Post{

        private String email;
        private String nickname;
        private String password;
        private String pwConfirm;
        private String agree1;
        private String agree2;

    }

    @Getter
    public static class Patch{

    }

    @Getter
    public static class Response{

    }

}
