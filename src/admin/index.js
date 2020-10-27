import CMS from "netlify-cms";
import NetlifyCMSWidgetMaterialIcons from "netlify-cms-widget-material-icons";

CMS.registerPreviewStyle(
  "https://fonts.googleapis.com/css?family=Material+Icons"
);
CMS.registerWidget(
  "material-icons",
  NetlifyCMSWidgetMaterialIcons.Control,
  NetlifyCMSWidgetMaterialIcons.Preview
);
