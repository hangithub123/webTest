public class Replace {
    public static void main(String[] args) {
        StringBuffer str=new StringBuffer();
        str.append("");
        System.out.println(str.replace(str.length()-1,str.length(),")"));
    }
}
