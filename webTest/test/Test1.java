import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Test1 {
    public  void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(5);
        Thread1 p1=new Thread1();
        executor.execute(p1);
    }
    class Thread1 implements Runnable{
        public void run() {
            try {
                System.out.println("线程1开始执行");
                Thread.sleep(5000L);
                System.out.println("线程1结束执行");
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
}
