<<<<<<< unit-testing-mediapipe


def add_nums(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Both inputs must be of type int or float")
    return a + b
=======
def add_numbers(a, b):
    return a + b

def subtract_numbers(a, b):
    return a - b

def divide_numbers(a, b):
    return a/b

def multiple_numbers(a, b):
    return a*b
>>>>>>> unit-testing
