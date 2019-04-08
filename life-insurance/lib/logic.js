/**
 * Add patientform.
 * @param {org.aetna.insurance.PatientRegistration} PatientRegistrationRecords.
 * @transaction
 */

function PatientRegistration(PatientRegistrationRecords){
  console.log(PatientRegistrationRecords);
  var factory = getFactory();
  var newPatientRegistrationRecords = factory.newResource('org.aetna.insurance','Patientform',PatientRegistrationRecords.patientform.pid);
  newPatientRegistrationRecords = PatientRegistrationRecords.patientform;
  return getAssetRegistry('org.aetna.insurance.Patientform')
  .then(function(registry) {
    registry.add(newPatientRegistrationRecords);
  });
}


/**
 * Add Hospital.
 * @param {org.aetna.insurance.HospitalRegistration} HospitalRegistrationRecords.
 * @transaction
 */

function HospitalRegistration(HospitalRegistrationRecords){
  console.log(HospitalRegistrationRecords);
  var factory = getFactory();
  var newHospitalRegistrationRecords = factory.newResource('org.aetna.insurance','Hospital',HospitalRegistrationRecords.hospital.hid);
  newHospitalRegistrationRecords = HospitalRegistrationRecords.hospital;
  return getParticipantRegistry('org.aetna.insurance.Hospital')
  .then(function(registry) {
    registry.add(newHospitalRegistrationRecords);
  });
}


/**
 * Add Insurer.
 * @param {org.aetna.insurance.InsurerRegistration} InsurerRegistrationRecords.
 * @transaction
 */

function InsurerRegistration(InsurerRegistrationRecords){
  console.log(InsurerRegistrationRecords);
  var factory = getFactory();
  var newInsurerRegistrationRecords = factory.newResource('org.aetna.insurance','Insurer',InsurerRegistrationRecords.insurer.Iid);
  newInsurerRegistrationRecords = InsurerRegistrationRecords.insurer;
  return getParticipantRegistry('org.aetna.insurance.Insurer')
  .then(function(registry) {
    registry.add(newInsurerRegistrationRecords);
  });
}


/**
 * Add Beneficiary.
 * @param {org.aetna.insurance.BeneficiaryRegistration} BeneficiaryRegistrationRecords.
 * @transaction
 */

function BeneficiaryRegistration(BeneficiaryRegistrationRecords){
  console.log(BeneficiaryRegistrationRecords);
  var factory = getFactory();
  var newBeneficiaryRegistrationRecords = factory.newResource('org.aetna.insurance','Beneficiary',BeneficiaryRegistrationRecords.beneficiary.bid);
  newBeneficiaryRegistrationRecords = BeneficiaryRegistrationRecords.beneficiary;
  return getParticipantRegistry('org.aetna.insurance.Beneficiary')
  .then(function(registry) {
    registry.add(newBeneficiaryRegistrationRecords);
  });
}

/**
 * Add Certprovider.
 * @param {org.aetna.insurance.CertproviderRegistration} CertproviderRegistrationRecords.
 * @transaction
 */

function CertproviderRegistration(CertproviderRegistrationRecords){
  console.log(CertproviderRegistrationRecords);
  var factory = getFactory();
  var newCertproviderRegistrationRecords = factory.newResource('org.aetna.insurance','Certprovider',CertproviderRegistrationRecords.certprovider.cpid);
  newCertproviderRegistrationRecords = CertproviderRegistrationRecords.certprovider;
  return getParticipantRegistry('org.aetna.insurance.Certprovider')
  .then(function(registry) {
    registry.add(newCertproviderRegistrationRecords);
  });
}


/**
 * Add Funeralhome
 * @param {org.aetna.insurance.FuneralhomeRegistration} FuneralhomeRecords.
 * @transaction
 */

function FuneralhomeRegistration(FuneralhomeRecords){
  console.log(FuneralhomeRecords);
  var factory = getFactory();
  var newFuneralhomeRecords = factory.newResource('org.aetna.insurance','Funeralhome',FuneralhomeRecords.funeralhome.fhid);
  newFuneralhomeRecords = FuneralhomeRecords.funeralhome;
  return getParticipantRegistry('org.aetna.insurance.Funeralhome')
  .then(function(registry) {
    registry.add(newFuneralhomeRecords);
  });
}


/**
 * Add details to patient form.
 * @param {org.aetna.insurance.VerifyandNotifyBeneficiary} VerifyandNotifyBeneficiary.
 * @transaction
 */

function VerifyandNotifyBeneficiary(VerifyandNotifyBeneficiary){
  console.log(VerifyandNotifyBeneficiary);
  var patientform = VerifyandNotifyBeneficiary.patientform;
  var beneficiaryform = VerifyandNotifyBeneficiary.beneficiary;
  
    patientform.Policyno = VerifyandNotifyBeneficiary.Policyno;
    patientform.Beneficiary_name = VerifyandNotifyBeneficiary.beneficiary.name;
    patientform.Beneficiary_notified = 'YES';
  
  return getAssetRegistry('org.aetna.insurance.Patientform')
  .then(function(Patientformregistry) {
    return Patientformregistry.update(patientform);
  });
}


/**
 * Add details to patient form.
 * @param {org.aetna.insurance.Beneficiaryupdate} Beneficiaryupdate.
 * @transaction
 */

function Beneficiaryupdate(Beneficiaryupdate){
  var patientform = Beneficiaryupdate.patientform;
  var funeralhome = Beneficiaryupdate.funeralhome.name;
  var fhid = Beneficiaryupdate.funeralhome.fhid;
  patientform.Funeralhome_notified = 'YES';
  patientform.InsurerVerified = 'YES';
  patientform.fhid = fhid;
  patientform.funeralhome = funeralhome;
  return getAssetRegistry('org.aetna.insurance.Patientform')
  .then(function(Patientformregistry) {
    return Patientformregistry.update(patientform);
  });
}

/**
 * Add details to patient form.
 * @param {org.aetna.insurance.providecert} providecert.
 * @transaction
 */

function providecert(providecert){
  var patientform = providecert.patientform;
  patientform.Cert_Provided = 'YES';
  return getAssetRegistry('org.aetna.insurance.Patientform')
  .then(function(Patientformregistry) {
    return Patientformregistry.update(patientform);
  });
}

/**
 * Add details to patient form.
 * @param {org.aetna.insurance.claiminitiation} claiminitiation.
 * @transaction
 */

function claiminitiation(claiminitiation){
  var patientform = claiminitiation.patientform;
  patientform.Claimstatus = 'Granted';
  return getAssetRegistry('org.aetna.insurance.Patientform')
  .then(function(Patientformregistry) {
    return Patientformregistry.update(patientform);
  });
}

/**
 * Add details to patient form.
 * @param {org.aetna.insurance.requestcert} requestcert.
 * @transaction
 */

function requestcert(requestcert){
  var patientform = requestcert.patientform;
  patientform.Cert_Requested = 'YES';
  return getAssetRegistry('org.aetna.insurance.Patientform')
  .then(function(Patientformregistry) {
    return Patientformregistry.update(patientform);
  });
}
 
