# Generated by Django 4.1.5 on 2023-01-29 17:21

import ckeditor.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import portfolio.validators


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0012_alter_comment_author_alter_post_author_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="comment", name="content", field=ckeditor.fields.RichTextField(),
        ),
        migrations.AlterField(
            model_name="postimage",
            name="image",
            field=models.ImageField(
                upload_to="post/images",
                validators=[portfolio.validators.validate_file_size],
            ),
        ),
        migrations.AlterField(
            model_name="profileimage",
            name="image",
            field=models.ImageField(
                upload_to="profile/images",
                validators=[portfolio.validators.validate_file_size],
            ),
        ),
        migrations.AlterField(
            model_name="profileimage",
            name="profile",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="images",
                to="portfolio.profile",
            ),
        ),
        migrations.AlterField(
            model_name="projectimage",
            name="image",
            field=models.ImageField(
                upload_to="project/images",
                validators=[portfolio.validators.validate_file_size],
            ),
        ),
        migrations.CreateModel(
            name="PostFile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "file",
                    models.FileField(
                        upload_to="post/files",
                        validators=[
                            portfolio.validators.validate_document_size,
                            django.core.validators.FileExtensionValidator(
                                allowed_extensions=[
                                    "pdf",
                                    "py",
                                    "xls",
                                    "js",
                                    "doc",
                                    "txt",
                                ]
                            ),
                        ],
                    ),
                ),
                (
                    "post",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="files",
                        to="portfolio.post",
                    ),
                ),
            ],
        ),
    ]