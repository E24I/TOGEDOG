package togedog.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import togedog.server.domain.member.service.MemberService;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PasswordTest {

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    void passwordTest(){
        String encode = passwordEncoder.encode("345");
        String rowPassword = "345";


        System.out.println(encode);
        System.out.println(rowPassword);

        boolean matches = passwordEncoder.matches(rowPassword, encode);

        assertThat(matches).isTrue();
    }

}
