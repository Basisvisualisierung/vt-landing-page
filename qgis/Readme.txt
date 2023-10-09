Einbindung in QGIS

QGIS-Version
Wir empfehlen die Verwendung von QGIS 3.22.8.
Bei anderen QGIS-Versionen kann es zu Fehlern bei der Layer-Erstellung kommen.


Anleitung

* QGIS öffnen
* Im linken *Browser*-Fenster eine neue Verbindung erstellen, unter *Vektor Tiles/ Neue allgemeine Verbindung...
* Vektorkachelverbindung
  * Name vergeben (z.B. Basisvisualisierung-Farbe)
  * URL einfügen: https://basisvisualisierung.niedersachsen.de/services/basiskarte/v3/tiles/{z}/{x}/{y}.pbf
  * Maximale Zoomstufe auf 15 ändern
  * Stil URL einfügen: https://basisvisualisierung.niedersachsen.de/services/basiskarte/styles/vt-style-color.json
(Beispiel Color-Style. Weitere Stil-URL´s finden Sie unter https://basisvisualisierung.niedersachsen.de/. Ohne Stil-URL werden die Daten in einem Standard-Stil von QGIS dargestellt.)
  * Mit OK Fenster schließen
* Doppelklick fügt neu erstellte Vektorkachelverbindung als Layer dem QGIS-Projekt hinzu.
* Der Warnhinweis kann Ignoriert und mit x geschlossen werden.


Schriften
Folgende kostenlose Schriftarten sollten auf dem Betriebssystem installiert sein, um die Darstellung zu optimieren:

https://github.com/liberationfonts/liberation-fonts/tree/main/src
* Liberation Sans Regular
* Liberation Sans Bold

https://github.com/google/fonts/tree/main/ofl/cantarell
* Cantarell Oblique
* Cantarell Regular


Warnungen

Vektorkacheln: Stil konnte nicht vollständig umgewandelt werden

Die folgenden Warnungen traten beim Erzeugen des Vektorkachelstils auf:

* Nicht Öffentliches Gebäude 3D: Überspringe unbekannten Layertyp fill-extrusion
* Öffentliche Gebäude 3D: Überspringe unbekannten Layertyp fill-extrusion

Die genannten Warnungen können Ignoriert werden. 3D-Objekte werden von QGIS momentan ohne PlugIn nicht unterstützt.


Stand: 09.10.2023