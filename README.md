# SpectroGen

![](http://image.noelshack.com/fichiers/2018/13/7/1522597018-endresult.png)

This generates spectrogram from images.
Sound spectrogram are a type of graph used in sound engineering to represent the "signature" of a sound. 

They are the representation of the frequencies heard by unit of time. The frequency strengh is denoted by the colour of the graph at that point.
Therefore, **it is possible to generates a soundwave such that its spectrogram would represent an images**. This is the aim of this project.
Example of normal sound spectrogram:

![](http://image.noelshack.com/fichiers/2018/13/7/1522597066-spectrogramex-0klgntrfcj2.png)

I did two versions: 

## The original version
This one in Python 3. It takes as input an image, an output location and its duration and outputs a
WAV file containing the soundwave which spectrogram matches the image.

It can be used as follow:

    python3 spectrogen.py image.png sound.wav

for a 5 second `sound.wav` file which spectrogram represents `image.png`.<br>
`image.png` can be of any size and can be partially transparent. <br>
There's more customisation you can do onto the outputted file, just type `python3 spectrogen.py -h` to see every options and what they do.

The `sound.wav` file is outputted in 16bit WAV file with a sample rate of 44100.
The frequencies on which the image is encoded span from 0 to 22000 Hz as that's the maximum frequency that my version of Audacity allows me to see.

The program makes use of :
 - Numpy for matrix handling
 - Sympy for resampling the image
 - PIL for importing the said image
 - argparse for allowing you to pass arguments to the program with nice flags (-h, -c, etc...)
 - wave, struct and math which are just native python3 libraries (I think)
 
 They can all be installed with:

    pip3 install numpy sympy Pillow argparse

## The funnier version
This other version is entierly re-written in Javascript, HTML and CSS and can run offline by simply loading the `index.html` file in your favourite browser (tested on Firefox Quantum).
This version makes use of the **HTML5 canvas** feature to allow you to *draw* you spectrogram on a canvas, then press "Play" to play it or "Save" to download it. The colour has no effect
on the produced music but it's pretty so I added it anyway.

The downloaded file can be rendered in Audacity as a spectrogram and on it will appear the drawing you did on the HTML5 canvas.

I will very soon publish a live version of this on my website for internet people (you) to fiddle with.

All this project is opensource, if you use the sources please credit me that'd be nice of you.
Contact me if you want to collaborate. Cheerio !


