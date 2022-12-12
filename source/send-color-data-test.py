import requests
import array as arr
import board
import adafruit_tcs34725

i2c = board.I2C()
sensor = adafruit_tcs34725.TCS34725(i2c)

sensor.integration_time = 200
sensor.gain = 60

print('Color: ({0}, {1}, {2})'.format(*sensor.color_rgb_bytes))
data = sensor.color_rgb_bytes
print('data is: ', data)
print('data type is ', type(data))

# data = [255,0,255] # for testing with flora. current node.js server expects req.body as json array.
# we can easily change to object.

# print('Color: ({0}, {1}, {2})'.format(*sensor.color_rgb_bytes))

#res = requests.post(url = "http://localhost:5000/color", json = data)
res = requests.post(url = "https://sci-fair-scum.herokuapp.com/color", json = data)
# print(res)
