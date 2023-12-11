package togedog.server.global.auth.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import togedog.server.global.auth.utils.ErrorResponder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.error("인증실패 : {}", exception.getMessage());

        ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST, exception.getMessage()); //인증 정보와 일치하지 않는 정보를 전달했으므로 클라이언트의 잘못된 요청으로 판단한다.
    }
}
