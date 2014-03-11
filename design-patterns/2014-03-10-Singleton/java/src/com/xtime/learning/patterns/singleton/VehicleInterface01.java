package com.xtime.learning.patterns.singleton;

public class VehicleInterface01
{
    private static VehicleInterface01 instance = new VehicleInterface01();

    private int speed = 0;

    private boolean running = false;

    private VehicleInterface01() {}

    public static VehicleInterface01 getInstance()
    {
        return instance;
    }

    public void startEngine()
    {
    }

    public void stopEngine()
    {
    }

    public void accelerate(int factor)
    {
    }

    public static void main(String... args)
    {
        VehicleInterface01 instance1 = VehicleInterface01.getInstance();
        VehicleInterface01 instance2 = VehicleInterface01.getInstance();

        System.out.println("Equals: " + (instance1 == instance2));
    }
}