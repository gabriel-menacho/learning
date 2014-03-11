package com.xtime.learning.patterns.singleton;

public class VehicleInterface02
{
    private static VehicleInterface02 instance = null;

    private int speed = 0;

    private Thread task;

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
        final int speed = getSpeed();
        task = new Thread(new DisplaySpeed(this));
        task.start();
    }

    public void stopEngine()
    {
        if (task != null)
            task.interrupt();

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
            while (!Thread.currentThread().isInterrupted())
            {
                System.out.println("Vehicle engine running at: " + vi.getSpeed());
            }
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