import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;

public class ImageTest {
    public static void main(String[] args) throws Exception{
//        System.out.println(ImageUtil.getImgHeight(new File("D:\\files\\photosAlbum\\1ca4d879a43245818a2802cc88714951.png")));
//        System.out.println(ImageUtil.getImgWidth(new File("D:\\files\\photosAlbum\\1ca4d879a43245818a2802cc88714951.png")));
        BufferedImage image= ImageIO.read(new FileInputStream("D:\\左.jpg"));
//        //灰度化
//        BufferedImage nbi3= ImageUtil.grayImage(image);
//        ImageIO.write(nbi3,"bmp",new File("C:\\Users\\12247\\Desktop\\测试图片\\data\\灰度.bmp"));
//        //二值化
//        BufferedImage nbi2= ImageUtil.binaryImage(nbi3);
//        ImageIO.write(nbi2,"bmp",new File("C:\\Users\\12247\\Desktop\\测试图片\\data\\二值化.bmp"));
       // ImageUtil.binaryImage(ImageUtil.grayImage(image));
        //降噪
//        BufferedImage nbi=ImageUtil.denoise(nbi2);
        ImageIO.write(image,"jpg",new File("D:\\左2.jpg"));
    }
}
