from django.core.exceptions import ValidationError

def validate_file_size(file):
    max_size_kb = 9000

    if file.size >  max_size_kb * 1024:
        raise ValidationError(f'file too large cannot be larger than {max_size_kb}kb')

def validate_document_size(file):
    max_size_kb = 30000

    if file.size >  max_size_kb * 1024:
        raise ValidationError(f'file too large cannot be larger than {max_size_kb}kb')