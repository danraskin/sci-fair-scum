import requests
import board
import adafruit_tcs34725
# import time, math, sys
import RPi.GPIO as GPIO

i2c = board.I2C()
sensor = adafruit_tcs34725.TCS34725(i2c)

# Sensor integration time can be values between 2.4 and 614.4 (milliseconds)
sensor.integration_time = 250 # bigger = brighter
# Sensor gain can be 1, 4, 16, or 60
sensor.gain = 16 # bigger = brighter


# define the button - can be any GPIO pin
button = GPIO.setup(23, GPIO.IN) 
while True:
    if not GPIO.input(23):
        data = sensor.color_rgb_bytes
        r = int(data[0])
        g = int(data[0])
        b = int(data[0])
        
        #print('Color: ({0}, {1}, {2})'.format(*sensor.color_rgb_bytes))
        print('Color: ({0}, {1}, {2})'.format(*data))
        
        # don't send pure white color info:
        if r > 250 and g > 250 and b > 250:
            print("white reading, do nothing")
        else:
            print("sending data...")
            res = requests.post(url = "https://sci-fair-scum.herokuapp.com/color", json = data)
            # could error handling go here?
   
   
   
"""
below are other code snippets that might be useful, but not needed now
"""
        
# print('Temperature: {0}K'.format(sensor.color_temperature))
# print('Lux: {0}'.format(sensor.lux))

# print('data is: ', data)
# print('data type is ', type(data))
# res = requests.post(url = "https://sci-fair-scum.herokuapp.com/color", json = data)

# data = [255,0,255] # for testing with flora. current node.js server expects req.body as json array.
# we can easily change to object.

# print('Color: ({0}, {1}, {2})'.format(*sensor.color_rgb_bytes))

#res = requests.post(url = "http://localhost:5000/color", json = data)
# res = requests.post(url = "https://sci-fair-scum.herokuapp.com/color", json = data)
# print(res)
 