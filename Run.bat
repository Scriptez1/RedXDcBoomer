@echo off
title RedXBoomer

if exist node_modules\ (
  echo Zaten indirdin modulleri tekrar kurmana gerek yok. - You have already downloaded the modules, you do not need to install them again.
  echo Calistirmak icin "config" klasorundeki ayarlayi yapmayi unutma. - Don't forget to make the settings in the "config" folder to run it.
  echo Daha Sonra "src" icerinseki nuker.bat calistir ve kullan. - Then run nuker.bat in "src" and use it.
  pause
  exit
) else (
  call npm i >> NUL
  echo Tum moduller indirildi. -  All modules downloaded.
  echo Artik botu calistirabilirsin. - You can now run the bot.
  pause
  exit
)