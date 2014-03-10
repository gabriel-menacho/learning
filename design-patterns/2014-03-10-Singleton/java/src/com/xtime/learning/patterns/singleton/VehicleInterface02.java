package com.xtime.learning.patterns.singleton;

public class VehicleInterface02
{
    private static VehicleInterface instance = null;

    private int speed = 0;

    private Thread task;

    private VehicleInterface02() {}

    public synchronized VehicleInterface02 getInstance()
    {
        if (instance == null)
        {
            instance = new VehicleInterface02();
        }

        return instance;
    }

    public void startEngine()
    {
        task = new Thread(new Runable()
        {
            public void run ()
            {
                while (!Thread.currentThread().isInterrupted())
                {
                    System.out.println("Vehicle engine running at: " + this.speed);
                }
            }
        })

    }

    public void stopEngine()
    {
        if (task != null)
            task.interrupt();

        System.out.println("Vehicle engine stopped");
    }

    public accelerate(int factor)
    {
        this.speed += factor;
    }

    public static void main(String... args) throws Exception
    {
        VehicleInterface02 instance1 = VehicleInterface02.getInstance();
        VehicleInterface02 instance2 = VehicleInterface02.getInstance();

        System.out.println("Equals: " + (instance1 == instance2));

        instance1.startEngine();

        Thread.sleep(5000);

        instance.accelerate(55);

        Thread.sleep(4000);

        instance.stopEngine();
    }
}