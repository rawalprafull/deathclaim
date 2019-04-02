'use strict';

"scripts";[
	"./bootstrap-notify.js"
]

var app = angular.module('myModule',[]);

app.controller('myController', function($scope,$http){


	$scope.registerParticipants = function (formdata) {
	
	var pid = Date.now();
	formdata.pid = pid;
		
	var data = checkRegReqForParticipants(formdata);
	
	if(data==null){
		alert("Error !! please try again.");
		return null;
	}
		
        $("#cover-spin").show();	
	
	$http({
            method: 'POST',
            url: '/addParticipants',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();

		$scope.formData.pname = "";
		$scope.formData.pwd = "";
		
		$.notify({
			icon: "far fa-handshake",
			title: "Success !!",
			message: "Inserted record in ledger with unique Id : "+pid+" and TxId : "+response.data.RecordDetails.transactionId
		});

            } else {
                $.notify({
			icon: "fas fa-exclamation-triangle",
			title: "Error !!",
			type : "danger",
			message: "Request failed please try again or contact syster admin."
		});
            }
        });
      }

	
      function checkRegReqForParticipants(reqData){
	
	if(reqData.participants=='Beneficiary'){
	var data ={
		"data": {
			"$class": "org.aetna.insurance.BeneficiaryRegistration",
			"beneficiary": {
				"$class": "org.aetna.insurance.Beneficiary",
				"bid": reqData.pid,
				"name": reqData.pname
			}
		},
		"url": "http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.BeneficiaryRegistration"
	 }
            return data;

         }else if(reqData.participants=='Certificate provider'){
	    
     	    var data ={
             	 
		"data": {
 			"$class": "org.aetna.insurance.CertproviderRegistration",
 			"certprovider": {
 				"$class": "org.aetna.insurance.Certprovider",
 				"cpid": reqData.pid,
 				"name": reqData.pname
 				}
 			},
 		"url": "http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.CertproviderRegistration"
 			
	    }
	 	    
	     return data;	

	 }else if(reqData.participants=='Funeral Home'){
			
	 var data = {
		  "data": {
			"$class": "org.aetna.insurance.FuneralhomeRegistration",
			  "funeralhome": {
				"$class": "org.aetna.insurance.Funeralhome",
				  "fhid": reqData.pid,
					"name": reqData.pname
			  }
		  },
			"url": "http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.FuneralhomeRegistration"
		}
		
		return data;

         }else if(reqData.participants=='Insurer'){

		var data = {
				"data": {
					"$class": "org.aetna.insurance.InsurerRegistration",
					"insurer": {
						"$class": "org.aetna.insurance.Insurer",
						"Iid": reqData.pid,
						"name": reqData.pname
					}
				},
				"url": "http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.InsurerRegistration"
			}
	
		return data;

         }else if(reqData.participants=='Hospital'){

		var data = {
				"data": {
					"$class": "org.aetna.insurance.HospitalRegistration",
					"hospital": {
						"$class": "org.aetna.insurance.Hospital",
						"hid": reqData.pid,
						"name": reqData.pname
					}
				},
				"url": "http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.HospitalRegistration"
			}

		return data;
         }
	 else {
	     return null;
       	}
	
      }	

});
