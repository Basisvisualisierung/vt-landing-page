# Einbindung in QGIS

## QGIS-Version
Mit der hier verwendeten QGIS-Version 3.22.2 auf macOS Monterey 12.1 funktioniert die Einbindung der Vector Tiles wie im Video beschrieben.
Bei älteren QGIS-Versionen kann es zu fehlern oder einem Programmabsturz kommen.

***
## Anleitung

* QGIS öffnen
* Im linken *Browser*-Fenster eine neue Verbindung erstellen, unter *Vektor Tiles/ Neue allgemeine Verbindung...*
* Vektorkachelverbindung
  * *Name* vergeben (z.B. Basisvisualisierung-Farbe)
  * *URL* einfügen: https://basisvisualisierung.niedersachsen.de/services/basiskarte_ni/v1/tiles/{z}/{x}/{y}.pbf
  * *Maximale Zoomstufe* auf **15** ändern
  * *Stil URL* einfügen: https://basisvisualisierung.niedersachsen.de/services/basiskarte_ni/styles/vt-style-color.json
(Beispiel Color-Style. Weitere Stil-URL´s finden Sie unter https://basisvisualisierung.niedersachsen.de/ . Ohne Stil-URL werden die Daten in einem Standard-Stil von QGIS dargestellt.)
  * Mit *OK* Fenster schließen
* Doppelklick fügt neu erstellte Vektorkachelverbindung als Layer dem QGIS-Projekt hinzu.
* Der Warnhinweis kann Ignoriert und mit x geschlossen werden.

***
## Schriften
Folgende kostenlose Schriftarten sollten auf dem Betriebssystem installiert sein, um die Darstellung zu optimieren:

http://www.schriftarten-fonts.de/fonts/11136/liberation_sans.html

* Liberation Sans Regular
* Liberation Sans Bold

https://fonts.google.com/specimen/Cantarell#standard-styles

* Cantarell Oblique
* Cantarell Regular

***
## Warnungen

*Vektorkacheln: Stil konnte nicht vollständig umgewandelt werden*

*Die folgenden Warnungen traten beim Erzeugen des Vektorkachelstils auf:*

* *Nicht Öffentliches Gebäude 3D: Überspringe unbekannten Layertyp fill-extrusion*
* *Öffentliche Gebäude 3D: Überspringe unbekannten Layertyp fill-extrusion*

Die genannten Warnungen können Ignoriert werden. 3D-Objekte werden von QGIS momentan ohne PlugIn nicht unterstützt.



Stand: 18.01.2022