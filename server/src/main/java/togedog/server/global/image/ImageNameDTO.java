package togedog.server.global.image;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(force = true)
public class ImageNameDTO {

    private final String imageName;

    public ImageNameDTO(String imageName) {
        this.imageName = imageName;
    }
}
