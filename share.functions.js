/**
 * Share script
 * 2021-03-12 -> Created script.
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
    object.element.append(this.widget);
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
    if (typeof text !== "undefined") {
      a.innerText = text;
    }
    this.widget.append(a);
    this.widget.classList.add("shareWithButtonTrigger");
    document
      .getElementsByTagName("html")[0]
      .addEventListener("click", function () {
        a.parentNode.classList.remove("shareWrapperOpen");
      });
    setTimeout(function () {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var open = false;
        for (var i = 0; i < this.parentNode.classList.length; i++) {
          if (this.parentNode.classList[i] == "shareWrapperOpen") {
            open = true;
          }
        }
        if (open) {
          this.parentNode.classList.remove("shareWrapperOpen");
        } else {
          this.parentNode.classList.add("shareWrapperOpen");
        }
      });
    }, 100);
  },

  /** Social Media configs */
  socialMedia: {
    facebook: {
      active: true,
      name: "Facebook",
      icon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAADAUlEQVR4nO2bPWsUQRyHn9VIfCMIBhXOF0RQsRCNraVY+A1slNQWfhILiyBWfgRrwcpKwRcQUiRiiOYUPEV8SU5Nco4sjIX5O3c3LzuzezcPHOR+d9mdfW5ndmZnlkzGisJXl1JKZIE5BFwEWsAZYB+wqt+fAOaBz8AUsAysAI+LoniS9FQoxVTwOqeUmlNKLSg37oqCWjIRW+QALgFzwMn+XxvIqm9B6iJmF3AHuC4+ceO77wbqIGYGeATsEZ8kJLWYC8BTkdaAbQmLMAncF2lNSCnmHnBEpGHw7kOkEnMZuCrScPz23VIqMTdEEpae79ZSiDkAXBFpWLq+W0sh5myEq+FXkViS4nI9IxI7OsAisAmsb/lxy+PZC7z3LWQKMedFMhxtYBZ4GKOQKcQcF8lgFvSZ5t12DEvsNqbs1J0S6WBuxpRCAjG7dRtgSztyOZP2fG34FXuHTRHj3WGzpSlifoikYpoiJjpZjIEsxkAWYyCLMZDFGAgxVtoPXAOmB3Tbu/q7Lj9GOST4oHvOSm+jHFmvATuBL3o8NaHfz6foLf+DUuq0UqrjOGNYFbOioJaMYlX6BrwQqSUhxEzrifa6UFahd3UQU97D3SHSdCwBH333HkLMpEjS8irE3kOIqdPZUvJWJA6EEFO3BvyZSBwIcVDeq7IC8ynE5kbtcl3OJ70WqQOjJuaN7hF7M2piVkTiSAgxdVoJ9VwkjoQYRL4EbumB3N91KT/1xNph/Td6wHdUL0C05bZuO6b6/N9B4IFIHYm9zrflOOo9Zts/KQq/Q4vdxnT1ZLwtQRpUG/KNKgNZjIEsxkAWYyCLMZDFGMhiDDRFTOVPi20lthiV4iBdyFXJQGwxPcchwchXpcJx4Br99mlsMeXZsiHS/qgQT5PYkqIq2S407I2LGNs2xrX6eZGiKvVbKvI/NsdlOavtGbPh0C55k0JMRyT92a5fUWlCB28t9gMWNETM+rhUpUbQBDHei4BcaIKY6J07Ej3619btxjDzzK2Q89GZTEUAfwC0rYjhOtLMtAAAAABJRU5ErkJggg==",
      link: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
      eventLabel: "Shared on Facebook",
      backgroundColor: "#3b5693",
    },
    twitter: {
      active: true,
      name: "Twitter",
      icon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAFV0lEQVR4nO2be4xdQxzHP9VLyVYipazHKttNa4NoKdUgZb2C1KskqDQSj5IghEj/qH8k4hUk1CtBIkGjVdKmwh+oetussvzBWmqLKktfK0FVd2Ts7zZnZ84598x53HvPyfkkN9n9zZw5M987j9/M/C4lJSUlJSUlJTlljFIqjzU/EpgFdAB7A38C3wM9QLeVOwaVercoIWcB5wNnAlN8itoArAFeAlZaqdHYB9iK7jE5+HQppXqVG/1KqWsc2naOUmqNUqrt/1Hkk6FVPn5pjfgsdhTEZIlSqiWk3jOVUs/IM6uqdr+MryulBpVSFZ+0en4OUEqttZoZjwGl1DSpuxZpqvSmjzylbVdKjQsS5lBPxk8bKIqu/MaURPHSo5TaYllHmOetw27GdHSF5+9jgSUNmmTfBVota3KOk8nV5E3gBa/NFKbT+P8y4GWrmGy5S76UevGxrHJeppvC7OtTmbnAW5Y1G3QvubNO79oJ3C3+kGYCMA/oB+4whTnIenyELmAtMMNKSZenMi6/yg4ZrgPAA8BrwA/A88AwcLXp+X4LTLaKGc3NwKOWNTm6t/6ekRAmO0WcPQ3753oY4TPHbLeKsHkEWG5Zk3NEBmUGMdZHlPXAidV/TGE2BRRkcjHQB8yxUuJzdKpNd+MfmS52dQxTmEGH4qbIfmSFZwJLwjH102EU3fKlrPMaTWEGrMdqozd1HwLvABcmqOD+liVb/gUWATOBb8w3mcKsSFCV2cCrwGey7JljuNn4UZZrX0xh3jO7VAymybKnl7+nZeyOjVBMlIk/Tcy2j8Iv8TbLEo+J2h8Q51CLtBS4SZbDvXxKTOWAyQHd9jFB2YNO8F4ELres6aH9lZ9lFRwCtgGTZDjWCz2fHh70riBhENe4w7IWh6999oa78A6l8UbaGVbuYvFXWGu8wkyUPYN23hBP8BDgC+upYvB3WCu8wuhT9nPF3V8vK8p0OZMZsp7MPxvCWmDOMauBU61cI85Q3m4UarHIxY/5xcoxQtFE0XxpWTyYwvRZOYpLT1jLzKHUIct00emrdcxh9hh9UPWklat41NwT+jl4uwN/AOOs3MVBH0h9EtYav72SPvKba1mLw2AtUYKE0WhH7x7LWgyWRWmF31Dy8jBwi2XNN+3izIYS1GOq3ApcJcOrCKyKIgoRhNE8J+e7b1gp+eOVqDV2jahqA66UPdWsiCdzzYS+6fw1Sn1qufr6KGIBsFEOk/TG6325sTwhZ8LcG1UUIvQY3fBeiXnLM/qkcD+X+teaY/RV5kWWNX9c51rjKJNvfx0v27Og22XSreIy+W6SUIm8MUluKZyI0mOqnCYhEnni/jiiEGO51kedbweEazUbvXL5FwuXHoNcvx4ld9XNjI5eOD1J/VyFQXyZk4CHmnhodTmEtPiS9LcEVU/4eAlDaxP7cEzR0+BaueFIRBY/srhULvX3sFKyZyFwXxpvSftbnSExerkWhRSvRQ4EHsw4ECCMG4HHQtKdSSqM3n/Ml6DlFiu1PixMWxRiCqMjpS4AbpAwrUZFTnXLRJvJ3XpF5pmwZVenTwVOkR9SzXbdqWaA3rtdn+ULKhJHP1+OL9dJlNF4iX7QF3CHAQdbTzaGLcDtwLNZv70iB0/tMk80uieE8YRcxG8OyZMaph+jV5VLPDEyjWaz/FxmufzWsW4EOXidMoYXNOhG8idgMfC43IrWnSBhqrSKJ3secLaVmi5DEmm+TK45whaEzHHZEkwWcU6WZbrdyuHGDtmtfyDDZHUzRW4l2St1SihFh2weJ8g5TYvn9mBYYt22yYqyVUIwvgO+An6zSi0pKSkpOsB/I0aZ4MJYmK4AAAAASUVORK5CYII=",
      link: "http://www.twitter.com/share?url={{url}}",
      eventLabel: "Shared on Twitter",
      backgroundColor: "#1b9ceb",
    },
    whatsapp: {
      active: true,
      name: "WhatsApp",
      icon:
        "data:image/png;base64,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",
      link: "whatsapp://send?text={{url}}",
      api: "https://api.whatsapp.com/send/?phone={{phone}}",
      eventLabel: "Shared on WhatsApp",
      backgroundColor: "#3ebd4e",
    },
    linkedin: {
      active: true,
      name: "LinkedIn",
      icon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAADSklEQVR4nO2bO2gVQRSGv2gk4iP4AkUCalDEQgSxVREsRHwUIlqJok20sNMiaKtW4qOxU0RtRIxa+ooptFDiq1ERX4UGRAUVYjAZWe6E7N0zMzv3EZy9dz7Y5j8zc3d+dnbOnOUSiUQikUgkUlBa8m5bKSU0YBOwCmgD3gJ3gHeiVcC0tORO3U1iTOpaqJS6qJQaVOU8VUptybQN+qqZ1OTWKqWGlJvuRjHGdyl1AJ9E0Mx24KoxEhB5S8kdLRnTCtwENoigmUFgOvDXGA2EPGMmCEWyowJTEiYD24RaMHyMWS+UfNY1gzGtQhmfPkHhY0w1+ckHoRQMH2OSHeaXUN3ccEYLgI8xz4Fuodq5BzyzRhuFVFJ00pnalehTSk01JVRFS/ByyQzYpZT6Juwocc50A42e+aZJkrddwArd/w1wF3gsOgdMPTJfoTUC9ch8m5JojIUiZqiLgdXAcmAJ0A6MAF/0+64XuA8Mi54V4F5oY++YpJRwVAQlyXiXgGMiUqILOJAMKyJjJE/xC2BnRt8KHPQ8hw0APcBZPZagXhW802JztvPAtD3q65q1VznDqT6tSqnzooU/Jwz3IeaZxXcpfReKnQFrBL4Kxcxnrc4EHgJLja38OARM00+qN6G+fJMC+3ygv0ZTRtkPHBeqg1CN6dDnrQUiUj2Hgc2+vUM1phOYI9TaOeU7QrPlMYuAlUI10IwJ3h6hGCiiMX+EUhkbfVoXxZjXwD5gGTBP71hrgMuiZT6dPjtdEY4EF4DdGe2HznX6dJ5zRvRyk5RMXrlahP7E9BtMyZKk/deF6mauM1oAY/YKxcwRo2qnzRrRhGzMe/3E+PBSn659mZTXLmRjbgvFzSNntJyJQskQsjEfheLGdXitmJCN8T2Jj1JTYSpLyMb8FoqbWhO/MkI2Zkgobkac0XJyK1UhG1PJRPEp06bInXfIxtRYlHWSm/E36+eTQi+l/0o0xkJcShaa1ZhC70rjSaHPSuNJXErVEo2xEJeShfjytRCNseBrTO5AKVxj1mscE3U9dPr++BSh2HF9jG8Xip3cSn6GWUKxM9sa0fh+cEv+yDVDqGZ6jWqJK8BPoZp5YlTt9FRQw7kllEgkEolEIpFGAPgHyoHSMiFASrIAAAAASUVORK5CYII=",
      link: "https://www.linkedin.com/sharing/share-offsite/?url={{url}}",
      eventLabel: "Shared on LinkedIn",
      backgroundColor: "#0073af",
    },
    pinterest: {
      active: true,
      name: "Pinterest",
      icon:
        "data:image/png;base64,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",
      link: "http://pinterest.com/pin/create/link/?url={{url}}",
      eventLabel: "Shared on Pinterest",
      backgroundColor: "#b7081b",
    },
    email: {
      active: true,
      name: "Email",
      icon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAEGElEQVR4nO2aW6hUVRjHf3M8XR6kIoIiIsNumA+WkpkZ5SkqNCO6gD3YzRchjUKojBCiO4Qh3eglTQkr6sFKo6DErMxDRUSUeUlFqKhIJYWwcsd3/C/72Is9zJwzM3vO2esHwzlrzbdn1vrttb+11t5DIpFIJBKJRCJRCWrWySzL5gDTgb8qftqPBdbVarWVvaq4ArgtCqsmPcDKHnX9qKrbcAy4CGJGRW9Xl4NezL6q23CcjBNzL/BUFFI9bIAsx81KwcBNwKvA0RWUsl79/71Wqx0ZMYE3gXHAj9FhI5uXgMtNSuhlEHO73kBSzgE+qIiUO4B5rnzCkf+yLOvPDjPTLiv3ejQbuezOsuz8XH/fz7LsPdyI+Vp/3wUWO3sPAdcCf0eehzfW+TNcv08FNgFXAQe8mF7XzYeBd9zaZg1wLrBlhEixEz8D+FflGUofk1XeixOTx0bJdmC86ndIzutR5PBhPzATeMS1eKFO/DGurqeeGGMM8C0wy9XNBh6IIruf7zWhrHUttRn46aKW1xMTeDuXd2whePUwyjuvAOcBP6t8ltLCjVGkoxExKO+sdrnIpvKzgW+iyO5ioZYigRuArWp7XRoVY1ynDx2n8i5gArAiiiyfX4FLgCWuJU8CbzXasmbEoCnuO2COq7P7OHdHkeVho3ks8JlacDzwEXB/My1qVkxgRW7T+axWzn9EkZ3lCeW/A/rWCzUVT2+2FYMVY9wHfOimuvU6U2XlHZsxH3Rlyy39wIlRZAMMRYzRB2wDLlB5n/LOy1Fk+9ihvOfXWC8Cy4byjUMVY5wGfKUzFpgL3BVFtp7Vmn43u7Z8kdsUDopWiAmsys0CLwBT25h3bB93PXBI5T6t1idFkYOglWLQncCNwEkqb1Te+TiKHDx/AlcCj7lPWKR817IbbK0WY0zRdT9FZcs7lwHPRZHN8zlwpiSg50B2R+DxVneiHWKM0Rot/lnVAuDOKLJxbIlwMfCbjrC93A/aGLacdokJLM+NlGUaSb9EkfWZn5N8s/LJ6XWPGgLtFoNmJxs9x6m8STNJI7dOfwIuAp53dc8Ab7T7WVgnxKBRsl37F7QytRXq0ijyf9Ypn/SrxsR+CtwTRbaBTolBM9UnuX2VdfKWKPLwhq/P/chgmsROjSLbRCfFBJbmduSv6dLaq/IsTb8Bk7fBLQE6Qm8nv8xhu/OJwKXAHo2GsdoJ73Rxq3Ir6o5RxogJjNfOd5rKe5yUU4Avy5JCyWLQw60NWjEHrpGwiVF0BynrUsqzRPdzLM/cGr1bAt0iBt067RrKvpS6liSmgCSmgCSmgCSmgCSmgCSmgCSmgCSmgCSmgCSmgCCmij94LmLARRBzqCCoigy4CLtre4D1j15Vple/2kgkEolEIpFIJKoA8B9876o0iOa/mQAAAABJRU5ErkJggg==",
      link: "mailto:{{email}}?subject={{subject}}&body={{url}}",
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
        button.href = media.link.replace("{{url}}", this.url);
        button.style.backgroundImage = "url('" + media.icon + "')";
        button.style.backgroundColor = media.backgroundColor;
        button.classList.add("shareButton");
        button.setAttribute("data-label", media.eventLabel);
        button.target = "_blank";
        this.widget
          .getElementsByClassName("shareWrapperButtons")[0]
          .append(button);
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
                sWidth = window.screen.width / 2 - bWidth / 2,
                sHeight = window.screen.height / 2 - bHeight / 2,
                url = this.href,
                title = this.getAttribute("data-label");
              window.open(
                url,
                title,
                "scrollbars=no,width=" +
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
        var widget = this;
        var links = widget.widget.getElementsByTagName("a");
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
  createFloatingWhatsAppWidget: function (phones, side) {
    var whatsappWrapper = document.createElement("div");
    whatsappWrapper.classList.add("shareWhatsAppFloatingWidget");
    if (typeof side == "undefined") {
      side = "right";
    }
    if (side == "right") {
      whatsappWrapper.classList.add(
        "shareWhatsAppFloatingWidgetButtonRightSide"
      );
    } else {
      whatsappWrapper.classList.add(
        "shareWhatsAppFloatingWidgetButtonLeftSide"
      );
    }

    var button = document.createElement("a");
    button.classList.add("shareWhatsAppFloatingWidgetButton");
    button.style.backgroundColor = this.socialMedia.whatsapp.backgroundColor;
    button.style.backgroundImage =
      "url('" + this.socialMedia.whatsapp.icon + "')";
    whatsappWrapper.append(button);

    var ul = document.createElement("ul");
    ul.classList.add("shareWhatsAppFloatingWidgetPhoneList");
    if (typeof phones == "string") {
      phones = [phones];
    }
    for (var i = 0; i < phones.length; i++) {
      var li = document.createElement("li");
      li.innerHTML =
        "<a target='_blank' href='" +
        this.socialMedia.whatsapp.api.replace("{{phone}}", phones[i]) +
        "'>" +
        phones[i] +
        "</a>";
      ul.append(li);
    }
    whatsappWrapper.append(ul);
    document.getElementsByTagName("body")[0].append(whatsappWrapper);
    document
      .getElementsByTagName("html")[0]
      .addEventListener("click", function () {
        button.parentNode.classList.remove("shareWhatsAppFloatingWidgetOpen");
      });
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      var classes = this.parentNode.classList,
        open = false;
      for (var i = 0; i < classes.length; i++) {
        if (classes[i] == "shareWhatsAppFloatingWidgetOpen") {
          open = true;
        }
      }
      if (open) {
        this.parentNode.classList.remove("shareWhatsAppFloatingWidgetOpen");
        document
          .getElementsByTagName("html")[0]
          .classList.remove("whatsAppFloatingWidgetListOpen");
      } else {
        this.parentNode.classList.add("shareWhatsAppFloatingWidgetOpen");
        document
          .getElementsByTagName("html")[0]
          .classList.add("whatsAppFloatingWidgetListOpen");
      }
    });

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
  },
};
