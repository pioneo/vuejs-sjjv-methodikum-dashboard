export var title = [
    (v) => !!v || 'Feld ist erforderlich', // 'Field is required'
    (v) => ((v && v.length >= 5 && v.length <= 50)) || 'Anzahl der Zeichen zwischen 5 und 50', // 'Number of characters between 5 and 50'
]

export var duration = [
    (v) => !!v || 'Feld ist erforderlich', // 'Field is required'
    (v) => ((v > 0 && v <= 60)) || 'Die Zahl muss zwischen 1 und 60 liegen', // 'Number must be between 1 and 60'
]

export var description = [
    (v) => !!v || 'Feld ist erforderlich', // 'Field is required'
    (v) => ((v && v.length >= 10 && v.length <= 100)) || 'Anzahl der Zeichen zwischen 10 und 100', // 'Number of characters between 10 and 100'
]

export var tagsMultiple = [
    (v) => !!v || 'Feld ist erforderlich', // 'Field is required'
    (v) => ((v && v.length >= 1 && v.length <= 10)) || 'Anzahl der Tags zwischen 1 und 10', // Number of tags between 1 and 10
]

export var tagsSingle = [
    (v) => (!!v && v.length >= 1) || 'Feld ist erforderlich', // 'Field is required'
]

export var steps = [
    (v) => !!v || 'Feld ist erforderlich', // 'Field is required'
    (v) => ((v && v.length >= 10 && v.length <= 1000)) || 'Anzahl der Zeichen zwischen 10 und 1000', // 'Number of characters between 10 and 1000'
]
