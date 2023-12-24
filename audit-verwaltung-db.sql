DROP DATABASE IF EXISTS audit_verwaltung_db;

CREATE DATABASE audit_verwaltung_db;

USE audit_verwaltung_db;

-- Tabelle Law
CREATE TABLE Law (
    L_ID INT AUTO_INCREMENT PRIMARY KEY,
    L_Gesetz VARCHAR(255),
    L_Type VARCHAR(100),
    L_Desc VARCHAR(255),
    L_Text TEXT,
    L_validFrom DATE,
    L_validUntil DATE
);

-- Tabelle Questions
CREATE TABLE Questions (
    Q_ID INT AUTO_INCREMENT PRIMARY KEY,
    Q_Audited BOOLEAN,
    Q_Applicable BOOLEAN,
    Q_Finding_Level VARCHAR(100),
    L_Law INT,
    FOREIGN KEY (L_Law) REFERENCES Law(L_ID)
);

-- Tabelle Audit
CREATE TABLE Audit (
    A_ID INT AUTO_INCREMENT PRIMARY KEY,
    A_Date DATE,
    A_DateCount INT,
    A_LeadAuditorID INT,
    A_LeadAuditeeID INT,
    A_Status VARCHAR(50),
    A_Place VARCHAR(100),
    A_Topic VARCHAR(255),
    A_Type VARCHAR(100)
);

-- Tabelle Audit_Question
CREATE TABLE Audit_Question (
    Q_ID INT,
    A_ID INT,
    FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID),
    FOREIGN KEY (A_ID) REFERENCES Audit(A_ID)
);


-- Zufällige Daten für die Tabelle Law einfügen
INSERT INTO Law (L_Gesetz, L_Type, L_Desc, L_Text, L_validFrom, L_validUntil)
VALUES 
    ('Gesetz A', 'Type A', 'Beschreibung A', 'Text A', '2023-01-01', '2024-01-01'),
    ('Gesetz B', 'Type B', 'Beschreibung B', 'Text B', '2023-02-01', '2024-02-01'),
    ('Gesetz C', 'Type C', 'Beschreibung C', 'Text C', '2023-03-01', '2024-03-01');

-- Zufällige Daten für die Tabelle Questions einfügen
INSERT INTO Questions (Q_Audited, Q_Applicable, Q_Finding_Level, L_Law)
VALUES 
    (TRUE, TRUE, 'Level 1', 1),
    (FALSE, TRUE, 'Level 2', 2),
    (TRUE, FALSE, 'Level 3', 3);

-- Zufällige Daten für die Tabelle Audit einfügen
INSERT INTO Audit (A_Date, A_DateCount, A_LeadAuditorID, A_LeadAuditeeID, A_Status, A_Place, A_Topic, A_Type)
VALUES 
    ('2023-05-15', 1, 101, 201, 'Pending', 'Ort A', 'Thema A', 'Type X'),
    ('2023-06-20', 2, 102, 202, 'Completed', 'Ort B', 'Thema B', 'Type Y'),
    ('2023-07-25', 3, 103, 203, 'Ongoing', 'Ort C', 'Thema C', 'Type Z');

-- Zufällige Daten für die Tabelle Audit_Question einfügen
INSERT INTO Audit_Question (Q_ID, A_ID)
VALUES 
    (1, 1),
    (2, 2),
    (3, 3);

