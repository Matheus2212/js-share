/**
 * Share script
 * 2021-03-12 -> Created script.
 * 2021-03-12 -> Created WhatsApp Floating Widget
 * 2021-03-15 -> Changed WhatsApp to use a alpha background - Credits for Ismael Schmidt
 * 2021-06-03 -> Improved Browser compatibility list
 * 2022-04-05 -> refactor: Changed simple operation
 * 2022-06-07 -> refactor: Improved a bit the performance of the script
 * 2022-06-07 -> feature: Added navigator.share and navigator.canShare functions for mobile
 * 2022-11-08 -> refactor: Improved for use in HubSpot
 * 2022-11-09 -> feature: Added Small form mode to whatsapp widget
 */

var Share = {
  /** Wrapper element */
  widget: null,

  /** URL that will be shared */
  url: null,

  /** Callback function when user clicks a share button */
  onShare: null,

  /** Will define if the name of the social media will be shown inside the button */
  textInside: true,

  /** Will define if the options will be shown on a button click */
  withButton: false,

  /** Will define if a new window is opened when clicked on button */
  withWindow: false,

  /** Will prepare the script on the page */
  init: function (object) {
    this.setURL(object.url);
    this.createWidget();
    this.textInside = object.withText;
    var keys = Object.keys(this.socialMedia);
    for (var i = 0; i < keys.length; i++) {
      if (typeof object[keys[i]] !== "undefined") {
        this.socialMedia[keys[i]].active = object[keys[i]];
      }
    }
    if (typeof object.withWindow !== "undefined" && object.withWindow) {
      this.withWindow = true;
    }
    if (typeof object.onShare !== "undefined") {
      this.onShare = object.onShare;
    }
    this.createButtons();
    if (object.withButton) {
      this.withButton = object.withButton;
      this.createTriggerButton(object.shareButtonText);
    }
    object.element.appendChild(this.widget);
  },

  /** Will define which URL will shared */
  setURL: function (url) {
    if (typeof url == "undefined") {
      url = window.location.href;
    }
    this.url = encodeURIComponent(url);
  },

  /** ButtonIcon */
  createTriggerButton: function (text) {
    var a = document.createElement("a");
    a.href = "javascript:void(0)";
    a.classList.add("shareButtonTrigger");
    a.innerText = typeof text !== "undefined" ? text : "";
    this.widget.appendChild(a);
    this.widget.classList.add("shareWithButtonTrigger");
    document.body.addEventListener("click", function () {
      a.parentNode.classList.remove("shareWrapperOpen");
    });
    setTimeout(function () {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var open = this.parentNode.classList.contains("shareWrapperOpen")
          ? "remove"
          : "add";
        this.parentNode.classList[open]("shareWrapperOpen");
      });
    }, 100);
  },

  /** Social Media configs */
  socialMedia: {
    facebook: {
      active: true,
      name: "Facebook",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAADAUlEQVR4nO2bPWsUQRyHn9VIfCMIBhXOF0RQsRCNraVY+A1slNQWfhILiyBWfgRrwcpKwRcQUiRiiOYUPEV8SU5Nco4sjIX5O3c3LzuzezcPHOR+d9mdfW5ndmZnlkzGisJXl1JKZIE5BFwEWsAZYB+wqt+fAOaBz8AUsAysAI+LoniS9FQoxVTwOqeUmlNKLSg37oqCWjIRW+QALgFzwMn+XxvIqm9B6iJmF3AHuC4+ceO77wbqIGYGeATsEZ8kJLWYC8BTkdaAbQmLMAncF2lNSCnmHnBEpGHw7kOkEnMZuCrScPz23VIqMTdEEpae79ZSiDkAXBFpWLq+W0sh5myEq+FXkViS4nI9IxI7OsAisAmsb/lxy+PZC7z3LWQKMedFMhxtYBZ4GKOQKcQcF8lgFvSZ5t12DEvsNqbs1J0S6WBuxpRCAjG7dRtgSztyOZP2fG34FXuHTRHj3WGzpSlifoikYpoiJjpZjIEsxkAWYyCLMZDFGAgxVtoPXAOmB3Tbu/q7Lj9GOST4oHvOSm+jHFmvATuBL3o8NaHfz6foLf+DUuq0UqrjOGNYFbOioJaMYlX6BrwQqSUhxEzrifa6UFahd3UQU97D3SHSdCwBH333HkLMpEjS8irE3kOIqdPZUvJWJA6EEFO3BvyZSBwIcVDeq7IC8ynE5kbtcl3OJ70WqQOjJuaN7hF7M2piVkTiSAgxdVoJ9VwkjoQYRL4EbumB3N91KT/1xNph/Td6wHdUL0C05bZuO6b6/N9B4IFIHYm9zrflOOo9Zts/KQq/Q4vdxnT1ZLwtQRpUG/KNKgNZjIEsxkAWYyCLMZDFGMhiDDRFTOVPi20lthiV4iBdyFXJQGwxPcchwchXpcJx4Br99mlsMeXZsiHS/qgQT5PYkqIq2S407I2LGNs2xrX6eZGiKvVbKvI/NsdlOavtGbPh0C55k0JMRyT92a5fUWlCB28t9gMWNETM+rhUpUbQBDHei4BcaIKY6J07Ej3619btxjDzzK2Q89GZTEUAfwC0rYjhOtLMtAAAAABJRU5ErkJggg==",
      link: "https://www.facebook.com/sharer/sharer.php?u=url",
      eventLabel: "Shared on Facebook",
      backgroundColor: "#3b5693",
    },
    twitter: {
      active: true,
      name: "Twitter",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAFV0lEQVR4nO2be4xdQxzHP9VLyVYipazHKttNa4NoKdUgZb2C1KskqDQSj5IghEj/qH8k4hUk1CtBIkGjVdKmwh+oetussvzBWmqLKktfK0FVd2Ts7zZnZ84598x53HvPyfkkN9n9zZw5M987j9/M/C4lJSUlJSUlJTlljFIqjzU/EpgFdAB7A38C3wM9QLeVOwaVercoIWcB5wNnAlN8itoArAFeAlZaqdHYB9iK7jE5+HQppXqVG/1KqWsc2naOUmqNUqrt/1Hkk6FVPn5pjfgsdhTEZIlSqiWk3jOVUs/IM6uqdr+MryulBpVSFZ+0en4OUEqttZoZjwGl1DSpuxZpqvSmjzylbVdKjQsS5lBPxk8bKIqu/MaURPHSo5TaYllHmOetw27GdHSF5+9jgSUNmmTfBVota3KOk8nV5E3gBa/NFKbT+P8y4GWrmGy5S76UevGxrHJeppvC7OtTmbnAW5Y1G3QvubNO79oJ3C3+kGYCMA/oB+4whTnIenyELmAtMMNKSZenMi6/yg4ZrgPAA8BrwA/A88AwcLXp+X4LTLaKGc3NwKOWNTm6t/6ekRAmO0WcPQ3753oY4TPHbLeKsHkEWG5Zk3NEBmUGMdZHlPXAidV/TGE2BRRkcjHQB8yxUuJzdKpNd+MfmS52dQxTmEGH4qbIfmSFZwJLwjH102EU3fKlrPMaTWEGrMdqozd1HwLvABcmqOD+liVb/gUWATOBb8w3mcKsSFCV2cCrwGey7JljuNn4UZZrX0xh3jO7VAymybKnl7+nZeyOjVBMlIk/Tcy2j8Iv8TbLEo+J2h8Q51CLtBS4SZbDvXxKTOWAyQHd9jFB2YNO8F4ELres6aH9lZ9lFRwCtgGTZDjWCz2fHh70riBhENe4w7IWh6999oa78A6l8UbaGVbuYvFXWGu8wkyUPYN23hBP8BDgC+upYvB3WCu8wuhT9nPF3V8vK8p0OZMZsp7MPxvCWmDOMauBU61cI85Q3m4UarHIxY/5xcoxQtFE0XxpWTyYwvRZOYpLT1jLzKHUIct00emrdcxh9hh9UPWklat41NwT+jl4uwN/AOOs3MVBH0h9EtYav72SPvKba1mLw2AtUYKE0WhH7x7LWgyWRWmF31Dy8jBwi2XNN+3izIYS1GOq3ApcJcOrCKyKIgoRhNE8J+e7b1gp+eOVqDV2jahqA66UPdWsiCdzzYS+6fw1Sn1qufr6KGIBsFEOk/TG6325sTwhZ8LcG1UUIvQY3fBeiXnLM/qkcD+X+teaY/RV5kWWNX9c51rjKJNvfx0v27Og22XSreIy+W6SUIm8MUluKZyI0mOqnCYhEnni/jiiEGO51kedbweEazUbvXL5FwuXHoNcvx4ld9XNjI5eOD1J/VyFQXyZk4CHmnhodTmEtPiS9LcEVU/4eAlDaxP7cEzR0+BaueFIRBY/srhULvX3sFKyZyFwXxpvSftbnSExerkWhRSvRQ4EHsw4ECCMG4HHQtKdSSqM3n/Ml6DlFiu1PixMWxRiCqMjpS4AbpAwrUZFTnXLRJvJ3XpF5pmwZVenTwVOkR9SzXbdqWaA3rtdn+ULKhJHP1+OL9dJlNF4iX7QF3CHAQdbTzaGLcDtwLNZv70iB0/tMk80uieE8YRcxG8OyZMaph+jV5VLPDEyjWaz/FxmufzWsW4EOXidMoYXNOhG8idgMfC43IrWnSBhqrSKJ3secLaVmi5DEmm+TK45whaEzHHZEkwWcU6WZbrdyuHGDtmtfyDDZHUzRW4l2St1SihFh2weJ8g5TYvn9mBYYt22yYqyVUIwvgO+An6zSi0pKSkpOsB/I0aZ4MJYmK4AAAAASUVORK5CYII=",
      link: "http://www.twitter.com/share?url=url",
      eventLabel: "Shared on Twitter",
      backgroundColor: "#1b9ceb",
    },
    whatsapp: {
      active: true,
      name: "WhatsApp",
      icon: "data:image/png;base64,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",
      link: "whatsapp://send?text=url",
      api: "https://api.whatsapp.com/send/?phone=phone_number",
      eventLabel: "Shared on WhatsApp",
      backgroundColor: "#3ebd4e",
    },
    linkedin: {
      active: true,
      name: "LinkedIn",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAADSklEQVR4nO2bO2gVQRSGv2gk4iP4AkUCalDEQgSxVREsRHwUIlqJok20sNMiaKtW4qOxU0RtRIxa+ooptFDiq1ERX4UGRAUVYjAZWe6E7N0zMzv3EZy9dz7Y5j8zc3d+dnbOnOUSiUQikUgkUlBa8m5bKSU0YBOwCmgD3gJ3gHeiVcC0tORO3U1iTOpaqJS6qJQaVOU8VUptybQN+qqZ1OTWKqWGlJvuRjHGdyl1AJ9E0Mx24KoxEhB5S8kdLRnTCtwENoigmUFgOvDXGA2EPGMmCEWyowJTEiYD24RaMHyMWS+UfNY1gzGtQhmfPkHhY0w1+ckHoRQMH2OSHeaXUN3ccEYLgI8xz4Fuodq5BzyzRhuFVFJ00pnalehTSk01JVRFS/ByyQzYpZT6Juwocc50A42e+aZJkrddwArd/w1wF3gsOgdMPTJfoTUC9ch8m5JojIUiZqiLgdXAcmAJ0A6MAF/0+64XuA8Mi54V4F5oY++YpJRwVAQlyXiXgGMiUqILOJAMKyJjJE/xC2BnRt8KHPQ8hw0APcBZPZagXhW802JztvPAtD3q65q1VznDqT6tSqnzooU/Jwz3IeaZxXcpfReKnQFrBL4Kxcxnrc4EHgJLja38OARM00+qN6G+fJMC+3ygv0ZTRtkPHBeqg1CN6dDnrQUiUj2Hgc2+vUM1phOYI9TaOeU7QrPlMYuAlUI10IwJ3h6hGCiiMX+EUhkbfVoXxZjXwD5gGTBP71hrgMuiZT6dPjtdEY4EF4DdGe2HznX6dJ5zRvRyk5RMXrlahP7E9BtMyZKk/deF6mauM1oAY/YKxcwRo2qnzRrRhGzMe/3E+PBSn659mZTXLmRjbgvFzSNntJyJQskQsjEfheLGdXitmJCN8T2Jj1JTYSpLyMb8FoqbWhO/MkI2Zkgobkac0XJyK1UhG1PJRPEp06bInXfIxtRYlHWSm/E36+eTQi+l/0o0xkJcShaa1ZhC70rjSaHPSuNJXErVEo2xEJeShfjytRCNseBrTO5AKVxj1mscE3U9dPr++BSh2HF9jG8Xip3cSn6GWUKxM9sa0fh+cEv+yDVDqGZ6jWqJK8BPoZp5YlTt9FRQw7kllEgkEolEIpFGAPgHyoHSMiFASrIAAAAASUVORK5CYII=",
      link: "https://www.linkedin.com/sharing/share-offsite/?url=url",
      eventLabel: "Shared on LinkedIn",
      backgroundColor: "#0073af",
    },
    pinterest: {
      active: true,
      name: "Pinterest",
      icon: "data:image/png;base64,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",
      link: "http://pinterest.com/pin/create/link/?url=url",
      eventLabel: "Shared on Pinterest",
      backgroundColor: "#b7081b",
    },
    email: {
      active: true,
      name: "Email",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAEGElEQVR4nO2aW6hUVRjHf3M8XR6kIoIiIsNumA+WkpkZ5SkqNCO6gD3YzRchjUKojBCiO4Qh3eglTQkr6sFKo6DErMxDRUSUeUlFqKhIJYWwcsd3/C/72Is9zJwzM3vO2esHwzlrzbdn1vrttb+11t5DIpFIJBKJRCJRCWrWySzL5gDTgb8qftqPBdbVarWVvaq4ArgtCqsmPcDKHnX9qKrbcAy4CGJGRW9Xl4NezL6q23CcjBNzL/BUFFI9bIAsx81KwcBNwKvA0RWUsl79/71Wqx0ZMYE3gXHAj9FhI5uXgMtNSuhlEHO73kBSzgE+qIiUO4B5rnzCkf+yLOvPDjPTLiv3ejQbuezOsuz8XH/fz7LsPdyI+Vp/3wUWO3sPAdcCf0eehzfW+TNcv08FNgFXAQe8mF7XzYeBd9zaZg1wLrBlhEixEz8D+FflGUofk1XeixOTx0bJdmC86ndIzutR5PBhPzATeMS1eKFO/DGurqeeGGMM8C0wy9XNBh6IIruf7zWhrHUttRn46aKW1xMTeDuXd2whePUwyjuvAOcBP6t8ltLCjVGkoxExKO+sdrnIpvKzgW+iyO5ioZYigRuArWp7XRoVY1ynDx2n8i5gArAiiiyfX4FLgCWuJU8CbzXasmbEoCnuO2COq7P7OHdHkeVho3ks8JlacDzwEXB/My1qVkxgRW7T+axWzn9EkZ3lCeW/A/rWCzUVT2+2FYMVY9wHfOimuvU6U2XlHZsxH3Rlyy39wIlRZAMMRYzRB2wDLlB5n/LOy1Fk+9ihvOfXWC8Cy4byjUMVY5wGfKUzFpgL3BVFtp7Vmn43u7Z8kdsUDopWiAmsys0CLwBT25h3bB93PXBI5T6t1idFkYOglWLQncCNwEkqb1Te+TiKHDx/AlcCj7lPWKR817IbbK0WY0zRdT9FZcs7lwHPRZHN8zlwpiSg50B2R+DxVneiHWKM0Rot/lnVAuDOKLJxbIlwMfCbjrC93A/aGLacdokJLM+NlGUaSb9EkfWZn5N8s/LJ6XWPGgLtFoNmJxs9x6m8STNJI7dOfwIuAp53dc8Ab7T7WVgnxKBRsl37F7QytRXq0ijyf9Ypn/SrxsR+CtwTRbaBTolBM9UnuX2VdfKWKPLwhq/P/chgmsROjSLbRCfFBJbmduSv6dLaq/IsTb8Bk7fBLQE6Qm8nv8xhu/OJwKXAHo2GsdoJ73Rxq3Ir6o5RxogJjNfOd5rKe5yUU4Avy5JCyWLQw60NWjEHrpGwiVF0BynrUsqzRPdzLM/cGr1bAt0iBt067RrKvpS6liSmgCSmgCSmgCSmgCSmgCSmgCSmgCSmgCSmgCSmgCCmij94LmLARRBzqCCoigy4CLtre4D1j15Vple/2kgkEolEIpFIJKoA8B9876o0iOa/mQAAAABJRU5ErkJggg==",
      link: "mailto:email?subject=subject&body=url",
      eventLabel: "Shared on Email",
      backgroundColor: "#17d3f5",
    },
  },

  /** Will create the social media share button */
  createButtons: function () {
    var keys = Object.keys(this.socialMedia);
    for (var i = 0; i < keys.length; i++) {
      var media = this.socialMedia[keys[i]];
      if (media.active) {
        var button = document.createElement("a");
        if (this.textInside) {
          button.innerText = media.name;
        }
        button.href = media.link.replace("=url", "=" + this.url);
        button.style.backgroundImage = "url('" + media.icon + "')";
        button.style.backgroundColor = media.backgroundColor;
        button.classList.add("shareButton");
        button.setAttribute("data-label", media.eventLabel);
        button.target = "_blank";
        this.widget
          .getElementsByClassName("shareWrapperButtons")[0]
          .appendChild(button);
      }
    }
    if (!this.textInside) {
      this.widget.classList.add("shareButtonNoText");
    }
    if (this.withWindow) {
      var widget = this;
      setTimeout(function () {
        var links = widget.widget.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
          var link = links[i],
            classes = link.classList,
            valid = true;
          for (var iterate = 0; iterate < classes.length; iterate++) {
            if (classes[iterate] == "shareButtonTrigger") {
              valid = false;
            }
          }
          if (valid) {
            link.addEventListener("click", function (event) {
              event.preventDefault();
              event.stopPropagation();
              var bWidth = 600,
                bHeight = 400,
                sWidth = window.innerWidth / 2 - bWidth / 2,
                sHeight = window.innerHeight / 2 - bHeight / 2,
                url = this.href,
                title = this.getAttribute("data-label");
              window.open(
                url,
                title,
                "location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=" +
                  bWidth +
                  ", height=" +
                  bHeight +
                  ", top=" +
                  sHeight +
                  ", left=" +
                  sWidth
              );
              if (widget.onShare !== null) {
                widget.onShare(title);
              }
            });
          }
        }
      }, 100);
    } else {
      if (this.onShare !== null) {
        var links = this.widget.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
          links[i].addEventListener("click", function (event) {
            var label = this.getAttribute("data-label");
            if (typeof label !== "undefined") {
              widget.onShare(label);
            }
          });
        }
      }
    }
  },

  /** Will create the wrapper element for the share buttons */
  createWidget: function () {
    var widget = document.createElement("div");
    widget.classList.add("shareWrapperElement");
    widget.innerHTML = "<div class='shareWrapperButtons'></div>";
    this.widget = widget;
  },

  /** This function creates a whatsapp floating button at the corner of the screen */
  createFloatingWhatsAppWidget: function (
    phones,
    side,
    hoverMessage,
    whatsappTextPlaceholder,
    whatsappForm
  ) {
    var whatsappWrapper = document.createElement("div");
    whatsappWrapper.classList.add("shareWhatsAppFloatingWidget");
    whatsappWrapper.id = "shareWhatsAppFloatingWidget";
    if (typeof side == "undefined") {
      side = "right";
    }
    side = side.charAt(0).toUpperCase() + side.slice(1);
    whatsappWrapper.classList.add(
      "shareWhatsAppFloatingWidgetButton" + side + "Side"
    );

    /** This is the floating icon button */
    var button = document.createElement("a");
    button.classList.add("shareWhatsAppFloatingWidgetButton");
    button.id = "shareWhatsAppFloatingWidgetButton";
    button.style.backgroundColor = this.socialMedia.whatsapp.backgroundColor;
    button.style.backgroundImage =
      "url('" + this.socialMedia.whatsapp.icon + "')";
    if (
      typeof hoverMessage !== "undefined" &&
      typeof hoverMessage == "string"
    ) {
      button.setAttribute("data-content", hoverMessage);
      button.classList.add("shareWhatsAppHover");
    }
    whatsappWrapper.appendChild(button);

    /** This will create the phone list */
    if (
      (typeof phones !== "string" &&
        typeof phones == "object" &&
        phones.length > 1) ||
      typeof whatsappForm !== "undefined"
    ) {
      var ul = document.createElement("ul");
      ul.classList.add("shareWhatsAppFloatingWidgetPhoneList");
      if (typeof phones == "string") {
        phones = [phones];
      }
      for (var i = 0; i < phones.length; i++) {
        var li = document.createElement("li");
        li.innerHTML =
          "<a target='_blank' href='" +
          this.socialMedia.whatsapp.api.replace(
            "phone_number",
            typeof phones[i] == "object"
              ? phones[i][1].replace(/[^0-9]/g, "")
              : phones[i].replace(/[^0-9]/g, "")
          ) +
          (typeof whatsappTextPlaceholder !== "undefined" &&
          typeof whatsappTextPlaceholder === "string"
            ? "&text=" + whatsappTextPlaceholder
            : "") +
          "'>" +
          (typeof phones[i] == "object" ? phones[i][0] : phones[i]) +
          "</a>";
        ul.appendChild(li);
      }
      whatsappWrapper.appendChild(ul);
    } else {
      button.setAttribute(
        "href",
        this.socialMedia.whatsapp.api.replace(
          "phone_number",
          typeof phones == "object"
            ? phones[0][1].replace(/[^0-9]/g, "")
            : phones.replace(/[^0-9]/g, "")
        ) +
          (typeof whatsappTextPlaceholder !== "undefined" &&
          typeof whatsappTextPlaceholder === "string"
            ? "&text=" + whatsappTextPlaceholder
            : "")
      );
      button.setAttribute("target", "_blank");
    }

    /** This will make a small form timed in 10sec when people enters a website or click the widget */
    if (typeof whatsappForm !== "undefined") {
      whatsappWrapper.classList.add("WhatsappWithForm");
      ul.classList.add("whatsappWidgetForm");
      var autoOpen = function () {
        setTimeout(function () {
          document
            .getElementById("shareWhatsAppFloatingWidgetButton")
            .dispatchEvent(new Event("click"));
        }, 10000);
      };
      autoOpen();
    }

    /** This will bind the click to close the floating widget */
    document.body.appendChild(whatsappWrapper);
    document.body.addEventListener("click", function () {
      button.parentNode.classList.remove("shareWhatsAppFloatingWidgetOpen");
    });

    /** This will bind the click to open/close the floating widget */
    if (
      (typeof phones !== "string" &&
        typeof phones == "object" &&
        phones.length > 1) ||
      typeof whatsappForm !== "undefined"
    ) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        var open = this.parentNode.classList.contains(
          "shareWhatsAppFloatingWidgetOpen"
        );
        if (open) {
          this.parentNode.classList.remove("shareWhatsAppFloatingWidgetOpen");
          var html = document.body;
          html.classList.remove("whatsAppFloatingWidgetListOpen");
          html.classList.add("whatsAppFloatingWidgetListClosing");
          setTimeout(function () {
            html.classList.remove("whatsAppFloatingWidgetListClosing");
          }, 500);
        } else {
          this.parentNode.classList.add("shareWhatsAppFloatingWidgetOpen");
          document.body.classList.add("whatsAppFloatingWidgetListOpen");
        }
      });

      /* This will bind the action to the phone list itens */
      var phoneNumbers = ul.getElementsByTagName("a"),
        widget = this;
      for (var i = 0; i < phoneNumbers.length; i++) {
        phoneNumbers[i].addEventListener("click", function (event) {
          if (widget.onShare !== null) {
            widget.onShare(widget.socialMedia.whatsapp.eventLabel);
          }
          document
            .getElementsByTagName("html")[0]
            .classList.remove("whatsAppFloatingWidgetListOpen");
        });
      }
    }
  },

  /* This will create the button to share url or files*/
  createSharer(parent, callback) {
    var button = document.createElement("a");
    button.classList.add("sharer");
    parent.appendChild(button);
    setTimeout(function () {
      button.addEventListener("click", callback);
    }, 100);
  },

  /* This will Share the url on mobile */
  link: function (title, url, text) {
    if (typeof navigator.share == "undefined") {
      console.log("Can't share");
      return false;
    }
    (title = title !== "" ? title : document.title),
      (url = url !== "" ? url : window.location.href),
      (text = text !== "" ? text : "I want to share it with you!");
    navigator
      .share({
        title: title,
        text: text,
        url: url,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  },

  /* This will Share the file on mobile */
  file: function (title, files, text) {
    if (navigator.canShare && navigator.canShare({ files: files })) {
      (title = title !== "" ? title : document.title),
        (text = text !== "" ? text : "I want to share it with you!");
      navigator
        .share({
          files: files,
          title: title,
          text: text,
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      return false;
    }
  },
};
