import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class AwaitTermination {
    public static void main(String[] args) {
        AwaitTermination a = new AwaitTermination();
        a.fun();
    }


    public void fun() {
        ExecutorService executor = Executors.newCachedThreadPool();
        try {
            Thread1 p1 = new Thread1("A",3000L);
            Thread1 p2 = new Thread1("B",6000L);
            Future f = executor.submit(p1);
            Future f2 = executor.submit(p2);
            if (executor.awaitTermination(5, TimeUnit.SECONDS)) { //定时间
                System.out.println("未超时");
            } else {
                if (!f.isDone()) {
                    System.out.println("A超时未完成");
                    f.cancel(true);
                } else {
                    System.out.println("A超时已完成");
                }
                if (!f2.isDone()) {
                    System.out.println("B超时未完成2");
                    f2.cancel(true);
                } else {
                    System.out.println("B超时已完成2");
                }
            }
            System.out.println("A被取消？："+f.isCancelled());
            System.out.println("B被取消？："+f.isCancelled());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
    }

    class Thread1 implements Runnable {
        private Long time=5000L;
        private String name=null;
        public Thread1(String name,Long time){
            this.time=time;
            this.name=name;
        }
        public void run() {
            try {
                System.out.println(name+"线程开始。。。");
                Thread.sleep(this.time);
                System.out.println(name+"线程结束。。。");
            } catch (Exception e) {
                System.out.println(name+"线程中断。。。");
                System.out.println(e.getMessage());
            }
        }
    }
}