import wave, struct, math
from random import randint

sampleRate = 44100.0 # hertz
duration = 1.0       # seconds
frequency = 500.0    # hertz

wavef = wave.open('sound.wav','w')
wavef.setnchannels(1) # mono
wavef.setsampwidth(2) 
wavef.setframerate(sampleRate)

max_i = int(duration * sampleRate)
swapRect = 1
for i in range(max_i):
    #value = int(32767.0*math.cos(frequency*math.pi*float(i)/float(sampleRate)))
    #value = 32767
    #if int(duration * sampleRate) % 2 == 0:
    #    value *= -1
    #value = int(i*2*32767/int(duration*sampleRate)/2)
    #value = int(int(duration * sampleRate) % (i/int(duration * sampleRate)*9000 + 1) * 3.2767 )

    # Sawtooth
    #value = int(i % (max_i/100) / (max_i/100) * 32767)

    # Square signal
    '''
    if math.floor(i/max_i*10) % 2 == 0:
        swapRect = -1
    else:
        swapRect = 1

    value = 0 if swapRect < 0 else 32767
    '''
    
    # White noise
    #value = randint(-32767-1, 32767)
    
    # Bi-band noise
    f = 900 if i % 2 == 0 else 4000
    value = 32767.0*math.cos(f * math.pi * float(i) / float(sampleRate))
    value = int(value)
    print(value, end=" - ")
    # Short int, little endian
    data = struct.pack('<h', value)
    wavef.writeframesraw( data )

wavef.writeframes(''.encode())
wavef.close()


