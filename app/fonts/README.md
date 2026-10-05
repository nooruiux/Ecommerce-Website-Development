# Self-hosted font files

`source-serif-4-opsz40-latin.woff2`: Source Serif 4 (SIL Open Font License 1.1, Adobe),
instanced with fontTools at `opsz=40` (weight axis kept, 400–700) and subset to the Google Fonts
"latin" range. 35 KB instead of the 122 KB opsz+wght variable file. opsz 40 reproduces the
Source Serif Pro line breaks used in the Figma design (see docs/qa-report.md).

Rebuild:

    fonttools varLib.instancer SourceSerif4.woff2 opsz=40 wght=400:700 -o tmp.ttf
    pyftsubset tmp.ttf --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
      --layout-features='*' --flavor=woff2 --output-file=source-serif-4-opsz40-latin.woff2
