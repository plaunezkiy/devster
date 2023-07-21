octaves = 9

notes = [
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
    "A",
    "A#/Bb",
    "B",
]

scales = {
    # TTSTTTS
    "Major": "2212221",
    # TSTTSTT
    "Minor": "2122122",
}

SCALE = "Major"
for idx, note in enumerate(notes):
    counter = idx
    scale = [note]
    for step in scales[SCALE]:
        counter += int(step)
        # % len(notes)
        scale.append(notes[counter % 12])
    print(f"{note} {SCALE} - {', '.join(scale)}")
