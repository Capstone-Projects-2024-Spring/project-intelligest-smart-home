import os

print(os.getcwd())
import sys
import cv2
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel
from PyQt5.QtCore import QTimer
from PyQt5.QtGui import QImage, QPixmap

class VideoWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Live Video Feed")
        self.setGeometry(100, 100, 800, 600)

        self.label = QLabel(self)
        self.label.resize(800, 600)
        self.adjust_video_widget_size()
        # Set up the timer for grabbing frames from the video feed
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.display_video_stream)
        self.timer.start(30)  # Update interval in ms
        
        
    def adjust_video_widget_size(self):
        """Adjust the QLabel size and position to occupy the upper right quadrant of the main window."""
        window_width = self.width()
        window_height = self.height()
        label_width = window_width // 2
        label_height = window_height // 2
        self.label.setGeometry(window_width - label_width, 0, label_width, label_height)

    
    def display_video_stream(self):
        """ Capture frame-by-frame from the camera and display it on the QLabel. """
        success, frame = cap.read()
        if success:
            # Convert the captured frame to RGB
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            height, width, channel = frame.shape
            step = channel * width
            # Create QImage from the frame
            qImg = QImage(frame.data, width, height, step, QImage.Format_RGB888)
            # Set the QPixmap to the QLabel for display
            self.label.setPixmap(QPixmap.fromImage(qImg))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    # Start video capture from the first camera device
    cap = cv2.VideoCapture(0)
    mainWin = VideoWindow()
    mainWin.show()
    sys.exit(app.exec_())
