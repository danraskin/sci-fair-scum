import requests
import board
import adafruit_tcs34725
# import time, math, sys
import RPi.GPIO as GPIO
import time

i2c = board.I2C()
sensor = adafruit_tcs34725.TCS34725(i2c)

sensor.integration_time = 250
sensor.gain = 16

# Sensor integration time can be values between 2.4 and 614.4 (milliseconds)
# Sensor gain can be 1, 4, 16, or 60
# For both, bigger # = more sensitivity


# define the button - can be any GPIO pin
button = GPIO.setup(23, GPIO.IN) 
while True:
    if not GPIO.input(23):
        print('Color: ({0}, {1}, {2})'.format(*sensor.color_rgb_bytes))
        data = sensor.color_rgb_bytes
        # print('Temperature: {0}K'.format(sensor.color_temperature))
        # print('Lux: {0}'.format(sensor.lux))
        # print('data is: ', data)
        # print('data type is ', type(data))
        res = requests.post(url = "https://sci-fair-scum.herokuapp.com/color", json = data)

  

# data = [255,0,255] # for testing with flora. current node.js server expects req.body as json array.
# we can easily change to object.

# print('Color: ({0}, {1}, {2})'.format(*sensor.color_rgb_bytes))

#res = requests.post(url = "http://localhost:5000/color", json = data)
# res = requests.post(url = "https://sci-fair-scum.herokuapp.com/color", json = data)
# print(res)
 