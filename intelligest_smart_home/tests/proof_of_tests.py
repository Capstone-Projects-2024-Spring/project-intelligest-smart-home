import unittest
from intelligest_smart_home.add_nums import add_numbers, subtract_numbers, divide_numbers

class TestAddNumbers(unittest.TestCase):
    def test_addition(self):
        result = add_numbers(1, 2)
        self.assertEqual(result, 3)
    
    def test_addition_negative(self):
        result = add_numbers(-1, -2)
        self.assertEqual(result, -3)

    def test_addition_zero(self):
        result = add_numbers(0, 0)
        self.assertEqual(result, 0)

    def test_addition_float(self):
        result = add_numbers(1.5, 2.5)
        self.assertEqual(result, 4)
    
    def test_addition_positive_negative(self):
        result = add_numbers(1, -2)
        self.assertEqual(result, -1)

    def test_addition_large_numbers(self):
        result = add_numbers(1000000, 2000000)
        self.assertEqual(result, 3000000)

    def test_addition_decimal_numbers(self):
        result = add_numbers(0.1, 0.2)
        self.assertAlmostEqual(result, 0.3)

    def test_addition_mixed_types(self):
        result = add_numbers(10, 2.5)
        self.assertAlmostEqual(result, 12.5)

    def test_add_fractions(self):
        result = add_numbers(55/100, 45/100)
        self.assertEqual(result, 1)

    def test_subtract_mixed_types(self):
        result = subtract_numbers(9284, 9053)
        self.assertEqual(result, 231)

    def test_divide_floating_point_numbers(self):
        self.assertAlmostEqual(divide_numbers(1, 3), 0.333, places=3)

    def test_split_devices(self):
        s = 'TV Lights Alarm Weather Thermostat Locks Reminders To-do-List'
        self.assertEqual(s.split(), ['TV', 'Lights', 'Alarm', 'Weather', 'Thermostat', 
                                     'Locks', 'Reminders', 'To-do-List'])
        with self.assertRaises(TypeError):
            s.split(8)
    
    def test_divide_floating_point_numbers(self):
        self.assertAlmostEqual(divide(1, 3), 0.333, places=3)

    def test_addition_string_input(self):
        with self.assertRaises(TypeError):
            add_numbers("Hello", "World")



if __name__ == '__main__':
    unittest.main()
