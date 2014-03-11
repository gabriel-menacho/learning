package com.xtime.learning.patterns.singleton;

import java.util.concurrent.*;

public class VehicleInterface02
{
    private static VehicleInterface02 instance = null;

    private int speed = 0;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    
    private ScheduledFuture display;

    private VehicleInterface02() {}

    public static synchronized VehicleInterface02 getInstance()
    {
        if (instance == null)
        {
            instance = new VehicleInterface02();
        }

        return instance;
    }

    public int getSpeed()
    {
        return this.speed;
    }
    
    public void startEngine()
    {
        display = scheduler.scheduleAtFixedRate(new DisplaySpeed(this), 1, 1, TimeUnit.SECONDS);
    }

    public void stopEngine()
    {
        display.cancel(true);
        
        System.out.println("Vehicle engine stopped");
    }

    public void accelerate(int factor)
    {
        speed += factor;
    }

    private static class DisplaySpeed implements Runnable
    {
        private VehicleInterface02 vi;
        
        public DisplaySpeed(VehicleInterface02 vi)
        {
            this.vi = vi;
        }
        
        public void run()
        {
            System.out.println("Vehicle engine running at: " + vi.getSpeed());
        }
    }
    
    public static void main(String... args) throws Exception
    {
        VehicleInterface02 instance1 = VehicleInterface02.getInstance();
        VehicleInterface02 instance2 = VehicleInterface02.getInstance();

        System.out.println("Equals: " + (instance1 == instance2));

        instance1.startEngine();

        Thread.sleep(5000);

        instance2.accelerate(55);

        Thread.sleep(4000);

        instance1.stopEngine();
    }
}