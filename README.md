# sci-fair-scum
sci-fair-scum

An interactive "light-to-sound" web audio synth/IoT art project.
First presentated Dec 18, 2022 @ Cyanotopia, MPLS, MN

See demo [here](https://sci-fair-scum.herokuapp.com)

Adafruit Flora Color Sensor (TCS34725) sends RBG color data to hosted node.js server via python script on RaspberryPi. Users navigate to browser app, which receives live RBG color data. Users interact with app to translate into sound using an experimental web audio library [i dropped my phone the screen cracked](https://github.com/billorcutt/i_dropped_my_phone_the_screen_cracked) by developer Bill Orcutt.

Hosted demonstration runs a node.js script (colorsource.js) which randomly generates RBG values every other second, replacing the function of the adafruit color sensor script (adafruit_tcs34725.py)


![pic](./demopic2.png)

Synth allows users to control three simultaneous signal chains, arranged as columns of thre squares. 
Top square in column generate sinewaves (osc and subosc) based on 'R' value of selected 'RBG' color.
Middle squares modulate sine frequencies via an LFO. LFO frequency and gain set by ratios of R, G, and B values.
Bottom squares are lpfs; they are currently deactivated, because the signal chain is not working properly.