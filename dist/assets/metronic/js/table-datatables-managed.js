var TableDatatablesManaged = function() {

	var initDatatable = function() {

		var table = $('#datatable');

		table
				.dataTable({

					"language" : {
						"aria" : {
							"sortAscending" : ": activer pour trier la colonne par ordre croissant",
							"sortDescending" : ": activer pour trier la colonne par ordre d&eacute;croissant"
						},
						"emptyTable" : "Aucune donn&eacute;e disponible dans le tableau",
						"info" : "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
						"infoEmpty" : "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
						"infoFiltered" : "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
						"lengthMenu" : "Afficher _MENU_ &eacute;l&eacute;ments",
						"search" : "Rechercher&nbsp;:",
						"zeroRecords" : "Aucun &eacute;l&eacute;ment &agrave; afficher",
						"paginate" : {
							"previous" : "Pr&eacute;c&eacute;dent",
							"next" : "Suivant",
							"last" : "Dernier",
							"first" : "Premier"
						}
					},

					"stateSave" : true,

					"lengthMenu" : [ [ 6, 15, 20, -1 ], [ 6, 15, 20, "All" ] ],
					"pageLength" : 6,
					"columnDefs" : [ {
						'orderable' : false,
						'targets' : [ 0 ]
					}, {
						"searchable" : false,
						"targets" : [ 0 ]
					} ],
					"order" : [ [ 1, "asc" ] ]
				});

	}

	return {

		init : function() {
			if (!jQuery().dataTable) {
				return;
			}
			initDatatable();
		}
	};

}();

if (App.isAngularJsApp() === false) {
	jQuery(document).ready(function() {
		TableDatatablesManaged.init();
	});
}