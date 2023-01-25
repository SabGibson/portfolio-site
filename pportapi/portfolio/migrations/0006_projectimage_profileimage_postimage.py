# Generated by Django 4.1.5 on 2023-01-25 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0005_alter_comment_status_alter_post_status_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProjectImage",
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
                    "image",
                    models.ImageField(upload_to="", verbose_name="project/images"),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profileimage",
                        to="portfolio.project",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProfileImage",
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
                    "image",
                    models.ImageField(upload_to="", verbose_name="profile/images"),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profileimage",
                        to="portfolio.profile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PostImage",
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
                ("image", models.ImageField(upload_to="", verbose_name="post/images")),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profileimage",
                        to="portfolio.post",
                    ),
                ),
            ],
        ),
    ]
