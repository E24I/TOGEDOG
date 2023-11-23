package togedog.server.global.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import togedog.server.global.auth.jwt.JWTokenizer;
import togedog.server.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.security.SignatureException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JWTokenizer jwTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        }
            catch (SignatureException se) {
                request.setAttribute("SignatureException", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("ExpiredJwtException", ee);
        } catch (Exception e) {
            request.setAttribute("Exception", e);
        }

        filterChain.doFilter(request, response);

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer", "");
        String base64EncodedSecretKey = jwTokenizer.encodeBase64SecretKey(jwTokenizer.getSecretKey());
        Map<String, Object> claims = jwTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        System.out.println("zz" + claims.get("email"));
        System.out.println("zz" + claims.get("roles"));
        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims){
        String email = (String) claims.get("email");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        log.info("email = {}, authorities={}", email, authorities);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
