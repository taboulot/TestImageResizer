adb push ./cat.HEIC /sdcard/Pictures
adb shell "am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/Pictures/"