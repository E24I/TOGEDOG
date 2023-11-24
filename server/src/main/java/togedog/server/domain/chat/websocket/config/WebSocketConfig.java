package togedog.server.domain.chat.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry messageBrokerRegistry) {
        messageBrokerRegistry.enableSimpleBroker("/sub");
        //enableSimpleBroker: Spring 에서 제공하는 내장 브로커 사용한다는 설정
        //관습적으로 queue 는 message 1:1로 송신될 때, topic 은 1:N으로 송신될 때 사용된다
        //하지만 이 프로젝트 에서는 1:1 만 있기 때문에 /sub 으로 커스텀 하였다

        messageBrokerRegistry.setApplicationDestinationPrefixes("/pub");
        //send destination 앞에 /app 을 붙여서 발신하면 해당 경로를 처리하고 있는 핸들러(MessageController.sendMessage)로 전달
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry
                .addEndpoint("/ws")
                .setAllowedOrigins("*");
                //.withSockJS();
        //WebSocket 을 사용하지 않는 브라우저는 sockJS를 사용하게 하는데 테스트 시 오류로 잠시 주석처리
    }
}
