package togedog.server.global.uri;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {

    public static URI createUri(String defaultUri, Long resourceId){

        return UriComponentsBuilder
                .newInstance()
                .path(defaultUri + "/{resourceId}")
                .buildAndExpand(resourceId)
                .toUri();
    }
}
