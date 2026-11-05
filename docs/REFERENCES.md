# Target State Driver License Specimen References & Visual Analysis

This document records the verified public specimen driver-license images and official state DMV source pages for all ten target states. Every reference below links to a direct raster specimen image (`.png`, `.jpg`, `.webp`) rather than a generic policy document or text manual. All backgrounds generated in this project are 100% original procedural vector artwork inspired by these specimens, strictly excluding text, photographs, personal information, barcodes, official seals, and state outlines.

---

## 1. Alaska (AK)
- **Authority / Issuer**: State of Alaska Department of Administration, Division of Motor Vehicles (DMV)
- **Specimen Edition**: Alaska Upgraded Polycarbonate REAL ID Driver License Specimen (Current Edition)
- **Official Source Page URL**: https://dmv.alaska.gov/general-information/upgraded-driver-s-license-security/
- **Secondary Official Page URL**: https://dmv.alaska.gov/credential-services/realidupdate/
- **Direct Specimen Image URL (Primary)**: `https://dmv.alaska.gov/media/zcqpjpkz/newdl.png`
- **Direct Specimen Image URL (Secondary)**: `https://dmv.alaska.gov/media/gaucqdhd/dmv-realid-2023v2-1.png`
- **Observed Composition**:
  - Multi-peak Denali and Alaska Range alpine silhouette spanning across the midground with sharp pyramidal crests, sunlit western faces, and shadowed eastern arêtes.
  - Rainbow split-fountain polycarbonate sky transitioning from deep arctic navy (`#0f172a`) and cobalt (`#1e3a8a`) into glacier cyan (`#bae6fd`) and pale aurora mint (`#f0fdf4`).
  - Undulating Aurora Borealis ribbon curtains sweeping across the upper third, paired with braided glacial river meltwater channels and a 5-petal forget-me-not state flower engraving in the lower margin.
- **Procedural Implementation (`src/designs/alaska.js`)**:
  - Three-peak Denali massif generated via unified pyramidal ridge geometry (`src/geometry.js`) with coupled glacier snowcap tongues, arête shadow facets, and internal rock contour lines.
  - Dual-frequency Aurora Borealis harmonic ribbon clusters (`#34d399` and `#38bdf8`), 11-line braided glacial river, forget-me-not floral flourish, OVI security medallion, and interwoven guilloche security border.

---

## 2. Arkansas (AR)
- **Authority / Issuer**: Arkansas Department of Finance and Administration (DFA), Office of Driver Services
- **Specimen Edition**: Arkansas REAL ID Driver License Specimen
- **Official Source Page URL**: https://www.dfa.arkansas.gov/real-id/
- **Secondary Official Page URL**: https://www.dfa.arkansas.gov/mydmv-service/real-id/
- **Direct Specimen Image URL (Primary)**: `https://www.dfa.arkansas.gov/wp-content/uploads/AR-Real-ID-Web-Banner-2048x819-2.jpg`
- **Direct Specimen Image URL (Secondary)**: `https://www.dfa.arkansas.gov/wp-content/uploads/REAL_ID_QUIZ.png`
- **Observed Composition**:
  - Central multi-ring geometric diamond guilloche rosette commemorating Crater of Diamonds State Park ("The Natural State"), surrounded by an inner hypotrochoid security spirograph.
  - Warm split-fountain background transitioning from pale emerald mint (`#ecfdf5`) through warm parchment cream (`#fefce8`) to soft sky azure (`#e0f2fe`).
  - Four-tier rolling Ozark and Ouachita highland wave contours, loblolly pine state tree silhouettes, apple blossom state flower engraving, and Arkansas River basin curves.
- **Procedural Implementation (`src/designs/arkansas.js`)**:
  - 9-ring faceted diamond rosette coupled with a 14-cycle hypotrochoid guilloche spirograph, four rolling Ozark contour clusters, 7 tiered loblolly pine silhouettes, 5-petal apple blossom engraving, and pinch-warped security grid.

---

## 3. Colorado (CO)
- **Authority / Issuer**: Colorado Department of Revenue (CDOR), Division of Motor Vehicles (DMV)
- **Specimen Edition**: "Iconic Colorado" Mount Sneffels Driver License Specimen
- **Official Source Page URL**: https://dmv.colorado.gov/real-id-and-colorado
- **Reference Specimen Page URL**: https://abclegaldocs.com/blog-Colorado-Notary/new-colorado-drivers-license-design/
- **Direct Specimen Image URL**: `https://abclegaldocs.com/blog-Colorado-Notary/wp-content/uploads/Colorado-drivers-license-design-400x250.jpg`
- **Observed Composition**:
  - Dramatic multi-tier San Juan Mountains skyline featuring Mount Sneffels (14,158 ft) in the foreground and distant alpine peaks behind, with jagged snow-filled couloirs and steep rock faces.
  - Rainbow split-fountain sky transitioning from deep alpine blue (`#1e3a8a`) and cyan (`#38bdf8`) into warm golden-peach sunrise tones (`#fed7aa`, `#fef08a`).
  - 54-ray radial solar guilloche fan radiating from behind the central summit, spruce forest silhouettes along the valley floor, and Rocky Mountain columbine engraving.
- **Procedural Implementation (`src/designs/colorado.js`)**:
  - Two distinct mountain range layers (2 distant peaks, 3 foreground Mount Sneffels peaks) with mathematically coupled snowcaps, couloir fingers, and arête shadows, backed by a 54-ray modulated solar fan and columbine floral flourish.

---

## 4. Idaho (ID)
- **Authority / Issuer**: Idaho Transportation Department (ITD), Division of Motor Vehicles
- **Specimen Edition**: Idaho Star Card REAL ID Specimen (2023–Present Redesign)
- **Official Source Page URL**: https://itd.idaho.gov/starcard/
- **Secondary Official Page URL**: https://itd.idaho.gov/faqs/star-card-faq/
- **Direct Specimen Image URL (Primary)**: `https://itd.idaho.gov/wp-content/uploads/2025/08/Star-Card-featured-image-1020x680.jpg`
- **Direct Specimen Image URL (Secondary)**: `https://itd.idaho.gov/wp-content/uploads/2025/04/Star-Card-Shoot-Edit-1_22-1-scaled.jpg`
- **Observed Composition**:
  - Serrated Sawtooth Mountain Range across the upper horizon with sharp pyramidal peaks, deep snow couloirs, and dark slate-blue rock facets.
  - Foothill stand of western white pine conifers anchoring the mountain base, with sweeping green and cobalt agricultural field furrows across the Snake River Plain below.
  - Pale azure-to-wheat split-fountain sky (`#bae6fd` to `#fef3c7`) with syringa (mock orange) 4-petal botanical engraving in the upper left.
- **Procedural Implementation (`src/designs/idaho.js`)**:
  - Three-peak high-roughness (`0.66`) Sawtooth range with coupled snowcaps, 11 western white pine silhouettes, 4 multi-line agricultural furrow and Snake River ribbon clusters, syringa floral flourish, and hyperbolic warped security grid.

---

## 5. Illinois (IL)
- **Authority / Issuer**: Illinois Secretary of State (ILSOS) & State of Illinois
- **Specimen Edition**: Illinois REAL ID Driver License Specimen
- **Official Source Page URL**: https://www.illinois.gov/services/service.id-card.html
- **Direct Specimen Image URL**: `https://s7d1.scene7.com/is/image/isp/services_sos_id?ts=1626825328171&$AgencyServiceComponents$`
- **Observed Composition**:
  - Neoclassical civic architecture featuring fluted limestone columns with Ionic volute capitals along the left margin and the Springfield State Capitol dome rotunda with radiating structural ribs in the center-right midground.
  - Soft blue, silver, and golden wheat split-fountain underprint (`#f8fafc`, `#e0f2fe`, `#fef3c7`).
  - Lake Michigan wave guilloche ribbons in the upper right, four tiers of rolling golden prairie striations across the lower half, and a 5-petal purple violet state flower engraving.
- **Procedural Implementation (`src/designs/illinois.js`)**:
  - Dual neoclassical fluted columns with entasis and Ionic volute scrolls, engraved State Capitol dome with 24 radial ribs, Lake Michigan 9-line wave ribbon, 4 prairie wave tiers, and violet botanical flourish.

---

## 6. Louisiana (LA)
- **Authority / Issuer**: Louisiana Department of Public Safety and Corrections, Office of Motor Vehicles (OMV)
- **Specimen Edition**: Louisiana REAL ID Driver License Specimen
- **Official Source Page URL**: https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/real-id/
- **Direct Specimen Image URL**: `https://expresslane.la.gov/omv/media/zomdwng4/real-id.jpg`
- **Observed Composition**:
  - Bright, high-legibility security card base with a soft Gulf Coast sky-to-parchment split-fountain gradient (`#f0f9ff`, `#fefce8`, `#ecfdf5`).
  - Intricate New Orleans French Quarter wrought-iron balcony scrollwork framing the upper header in warm bronze-gold (`#b45309`).
  - Dual-layer 8-petal Southern Magnolia blossom engraving in the center-right, four meandering Mississippi River delta waterway ribbons, and concentric cypress bayou water ripples in the lower left.
- **Procedural Implementation (`src/designs/louisiana.js`)**:
  - 20-panel interlocking S-scroll wrought-iron balcony filigree header, concentric 8-petal magnolia botanical engraving, 4 diagonal Mississippi delta wave bundles, 7 cypress ripple rings, and OVI security medallion.

---

## 7. Tennessee (TN)
- **Authority / Issuer**: Tennessee Department of Safety and Homeland Security (TDOSHS)
- **Specimen Edition**: Tennessee Driver License Specimen (2024 Redesign)
- **Official Source Page URL**: https://www.tn.gov/safety/driver-services/helpful-information/real-id.html
- **Secondary Official Page URL**: https://www.tn.gov/safety/news/2024/8/19/department-of-safety-and-homeland-security-unveils-new-tennessee-driver-licenses-and-self-service-kiosks.html
- **Direct Specimen Image URL**: `https://www.tn.gov/content/dam/tn/safety/images/driver-services/REGULAR_LICENSE_NOT_REALID.png`
- **Observed Composition**:
  - Layered Blue Ridge / Great Smoky Mountains silhouette in rich indigo-violet (`#4338ca`, `#312e81`) with pale lavender-white mountain mist (`#e0e7ff`) clinging to the upper ridges and valleys.
  - Undulating 5-line musical staff waves in warm gold (`#d97706`) sweeping across the upper sky, paired with a central 9-cycle hypotrochoid guilloche rosette and dogwood/iris botanical engraving.
- **Procedural Implementation (`src/designs/tennessee.js`)**:
  - Coupled Smoky Mountains silhouette with mist caps, 4 progressive atmospheric ridge wave clusters, 5-line gold musical staff wave bundle, central hypotrochoid rosette, and corner floral flourishes.

---

## 8. Utah (UT)
- **Authority / Issuer**: Utah Department of Public Safety, Driver License Division (DLD)
- **Specimen Edition**: Utah REAL ID Driver License Specimen (Delicate Arch & Beehive Edition)
- **Official Source Page URL**: https://dps.utah.gov/news/updated-real-id-information-april-15-2025/
- **Reference Specimen Page URL**: https://www.dreamstime.com/utah-usa-driver-license-specimen-card-showing-sample-personal-details-cartoon-photo-delicate-arch-background-real-id-star-not-image468430993
- **Direct Specimen Image URL**: `https://thumbs.dreamstime.com/b/utah-usa-driver-license-specimen-card-showing-sample-personal-details-cartoon-photo-delicate-arch-background-real-id-star-not-468430993.jpg`
- **Observed Composition**:
  - Freestanding sculpted Entrada Sandstone monolith of Delicate Arch rising on the right side from a slickrock sandstone bowl, featuring an asymmetric wide left buttress tapering to a narrow ankle, stepped caprock lintel, and inner vault shadow.
  - Hexagonal Beehive State security lattice in the upper-center sky, distant snow-capped Wasatch Range peaks on the left horizon, 16 horizontal red rock canyon strata lines, and a sego lily state flower engraving.
- **Procedural Implementation (`src/designs/utah.js`, `src/components/strata.js`)**:
  - Multi-part Delicate Arch sculpture (slickrock bowl pedestal, asymmetric outer/inner Bezier arch, coupled inner vault shadow, and horizontal bedding planes), 24-cell hexagonal beehive security lattice, 2-peak Wasatch range, and 16 sedimentary canyon strata lines.

---

## 9. Washington (WA)
- **Authority / Issuer**: Washington State Department of Licensing (DOL)
- **Specimen Edition**: Washington Enhanced Driver License (EDL) Specimen
- **Official Source Page URL**: https://dol.wa.gov/driver-licenses-and-permits/driver-license-designs
- **Secondary Reference Page URL**: https://commons.wikimedia.org/wiki/File:Washington_State_Enhanced_Driver%27s_License_-_Sample.webp
- **Direct Specimen Image URL (Official DOL)**: `https://dol.wa.gov/media/77`
- **Direct Specimen Image URL (Official ID)**: `https://dol.wa.gov/media/64`
- **Observed Composition**:
  - Prominent Mount Rainier (Tahoma) volcanic massif dominating the center-right skyline with deep glacial snow tongues, accompanied by a secondary Cascade peak on the left.
  - Stand of 12 coastal western hemlock conifers along the foothill ridge, three tiers of Puget Sound maritime wave guilloche ribbons in the foreground, and a coast rhododendron state flower engraving in the upper left.
- **Procedural Implementation (`src/designs/washington.js`)**:
  - Mount Rainier volcanic peak (`snowDrop: 0.46`) and secondary Cascade peak with coupled glacier snowcaps and internal rock contours, 12 5-tier conifer silhouettes, 3 Puget Sound wave bundles, and 6-petal rhododendron flourish.

---

## 10. Wyoming (WY)
- **Authority / Issuer**: Wyoming Department of Transportation (WYDOT), Driver Services
- **Specimen Edition**: Wyoming REAL ID Credential Specimen (Devils Tower & Teton Edition)
- **Official Source Page URL**: https://www.dot.state.wy.us/home/driver_license_records/id_cards.html
- **Direct Specimen Image URL**: `https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/ID_standard_limited%20term_horiz_front.png`
- **Observed Composition**:
  - Iconic flat-topped volcanic laccolith monolith of Devils Tower (Bear Lodge) rising on the right horizon with vertical hexagonal basalt column fluting, a stepped mesa summit, and a boulder talus apron at its base.
  - Jagged Grand Teton alpine peaks on the left-center horizon with coupled snowcaps and steep eastern shadow facets, High Plains wind vector streamlines sweeping across the sky, sagebrush steppe river contours below, and engraved western scrollwork in the upper corners.
- **Procedural Implementation (`src/designs/wyoming.js`)**:
  - Dedicated `generateDevilsTower` component with coupled eastern shadow flank, 15 curved vertical basalt column striations, and boulder talus apron; paired with 2-peak Grand Teton range, 12 dashed wind streamlines, 8 steppe wave lines, and western corner flourishes.
