/*
	SideMenu 1.0.0
	Criado por Janderson Costa em 08/04/2016.
	Descrição: Implementa um menu no canto esquerdo da página.
	Dependências: jquery 1.4.2+

	Uso:
		var sideMenu = new SideMenu({
			templateUrl: "menu.html",
			width: 350
		});
		sideMenu.show();
*/


function SideMenu(args) {
	var
	sideMenu,
	overlay,
	width = args.width || 350;

	// obtém o componente - menu.html
	$.get(args.templateUrl, function(html) {
		// injeta o componente na tela
		$("body").prepend(html);
		sideMenu = $("#sidemenu");
		overlay = $("#sidemenuOverlay");

		// configura menu e overlay
		setMenu();
		setOverlay();
	});

	// FUNÇÕES
	function setMenu () {
		var submenuBtn = sideMenu.find(".group-btn");

		// largura
		sideMenu.width(width).css("left", -width);

		// submenu - botões
		submenuBtn.each(function(i) {
			var submenu = $(this);

			submenu
			.click(function() {
				// expande/recolhe items
				toggleSubmenu($(this));
			})
			.bind("selectstart", function() {
				return false;
			});

			// seta up/down
			submenu.prev().click(function() {
				submenu.click();
			});
		});

		setItemsCount();
	}

	function setOverlay () {
		overlay.click(function() {
			closeMenu();
		});
	}

	function toggleSubmenu(submenuButton) {
		// seta up/down
		var
		items = submenuButton.next(),
		i = items.parent().find("i").eq(0).removeClass("arrow-up arrow-down");

		if (items.css("display") == "none") {
			i.addClass("arrow-up");
		}
		else {
			i.addClass("arrow-down");
		}

		// expande/recolhe items do submenu
		submenuButton.next().toggle(200);
	}

	function setItemsCount() {
		// informa o total de sites no rodapé do menu
		sideMenu.find(".items-count").text("Total: " + sideMenu.find(".item").length + " sites");
	}

	this.show = showMenu;
	function showMenu() {
		// overlay
		overlay.fadeIn(300);

		// menu
		sideMenu.animate({ left: 0 }, 150);

		disableScroll(true);
	}

	this.close = closeMenu;
	function closeMenu() {
		// overlay
		overlay.fadeOut(200);

		// menu
		sideMenu.animate({ left: -width }, 150);

		disableScroll(false);
	}

	function disableScroll(disable) {
		if (disable) {
			$("html, body").css({
				"overflow": "hidden"
			});
		}
		else {
			$("html, body").css({
				"overflow": "auto"
			});
		}
	}
}
