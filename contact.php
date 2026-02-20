<?php
// Spec AI - Contact Script
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Odbiór i czyszczenie danych (security first)
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // 2. Walidacja
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Błędne dane. Wypełnij wszystkie pola poprawnie."]);
        exit;
    }

    // 3. Konfiguracja odbiorcy
    $recipient = "as.dudek97@gmail.com"; // Tutaj Twój mail docelowy
    $subject = "Nowa wiadomość ze Spec AI od: $name";

    // 4. Budowa treści maila
    $email_content = "Imię/Warsztat: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Wiadomość:\n$message\n";

    // 5. Nagłówki maila
    $email_headers = "From: Spec AI System <no-reply@specai.pl>\r\n";
    $email_headers .= "Reply-To: $email";

    // 6. Wysyłka
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Dziękujemy! Wiadomość została wysłana."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Ups! Coś poszło nie tak z serwerem pocztowym."]);
    }

} else {
    http_response_code(403);
    echo json_encode(["message" => "Wystąpił problem z Twoją wysyłką, spróbuj ponownie."]);
}
?>
