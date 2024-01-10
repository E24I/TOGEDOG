package togedog.server.global.auth.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.filter.JwtAuthenticationFilter;
import togedog.server.global.auth.filter.JwtVerificationFilter;
import togedog.server.global.auth.handler.MemberAccessDeniedHandler;
import togedog.server.global.auth.handler.MemberAuthenticationEntryPoint;
import togedog.server.global.auth.handler.MemberAuthenticationFailureHandler;
import togedog.server.global.auth.handler.MemberAuthenticationSuccessHandler;
import togedog.server.global.auth.jwt.JWTokenizer;
import togedog.server.global.auth.utils.CustomAuthorityUtils;

import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTokenizer jwTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
//    private final OAuthService oAuthService;

//    public SecurityConfig(JWTokenizer jwTokenizer, CustomAuthorityUtils authorityUtils, MemberRepository memberRepository) {
//        this.jwTokenizer = jwTokenizer;
//        this.authorityUtils = authorityUtils;
//        this.memberRepository = memberRepository;
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
//                                /** ---------------------------------- member 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.POST, "/member/signup").permitAll()
//                                .antMatchers(HttpMethod.POST, "/member/signup/**").permitAll()
//                                .antMatchers(HttpMethod.PATCH, "/member/mypage/edit/**").hasRole("USER")
//                                .antMatchers(HttpMethod.PATCH, "/member/mypage/**").hasRole("USER")
//                                .antMatchers(HttpMethod.GET, "/member").hasRole("ADMIN")
//                                .antMatchers(HttpMethod.GET, "/member/**").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.DELETE, "/member/delete/**").hasAnyRole("USER")
//                                .antMatchers(HttpMethod.PATCH, "/member/mypage/image/upload/**").hasRole("USER")
//                                .antMatchers(HttpMethod.PATCH, "/member/mypage/image/delete/**").hasRole("USER")
//                                /** ---------------------------------- feed 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.POST, "/feed").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.GET, "/feed").permitAll()
//                                .antMatchers(HttpMethod.GET, "/feed/**").permitAll()
//                                .antMatchers(HttpMethod.PATCH, "/feed/**").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.DELETE, "/feed/**").hasAnyRole("ADMIN", "USER")
//                                /** ---------------------------------- reply 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.POST, "/reply").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.GET, "/reply").permitAll()
//                                .antMatchers(HttpMethod.GET, "/reply/**").permitAll()
//                                .antMatchers(HttpMethod.PATCH, "/reply/**").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.DELETE, "/reply/**").hasAnyRole("ADMIN", "USER")
//                                /** ---------------------------------- comment 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.POST, "/comment").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.GET, "/comment").permitAll()
//                                .antMatchers(HttpMethod.GET, "/comment/**").permitAll()
//                                .antMatchers(HttpMethod.PATCH, "/comment/**").hasAnyRole("ADMIN", "USER")
//                                .antMatchers(HttpMethod.DELETE, "/comment/**").hasAnyRole("ADMIN", "USER")
//                                /** ---------------------------------- map 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.POST, "/map/**").hasAnyRole("ADMIN", "USER")
//                                /** ---------------------------------- chat 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.PATCH, "/chat/**").hasAnyRole("ADMIN", "USER")
//                                /** ---------------------------------- admin 접근 권한 설정 ---------------------------------- **/
//                                .antMatchers(HttpMethod.GET, "/admin/**").hasAnyRole("ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/*/orders").hasRole("USER")
                                .anyRequest().permitAll()
//                )
//                .oauth2Login(oauth2 -> oauth2
//                        .successHandler(new OAuth2MemberSuccessHandler(jwTokenizer, authorityUtils, memberRepository))
//                        .userInfoEndpoint()
//                        .userService(oAuthService)
                );

        return http.build();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*")); => credential이 true 이면, setAllowedOrigins 사용이 불가능.
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "PUT","OPTIONS"));
        configuration.addExposedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
