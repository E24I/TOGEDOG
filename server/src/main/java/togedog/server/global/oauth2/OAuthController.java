package togedog.server.global.oauth2;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.global.auth.utils.LoginMemberUtil;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;
    private final LoginMemberUtil loginMemberUtil;

    @PostMapping("/login/{login-type}")
    public ResponseEntity<?> post(@PathVariable("login-type")String loginType,
                       @RequestBody OAuthDto.TokenDto oAuthDto) {


        String token = oAuthService.oAuthLogin(LoginType.valueOf(loginType.toUpperCase()), oAuthDto.getToken());

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.set("Id", String.valueOf(loginMemberId));

        return new ResponseEntity<>(null,headers, HttpStatus.NO_CONTENT);
    }

}
